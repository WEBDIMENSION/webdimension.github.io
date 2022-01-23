#!/usr/bin/env bash

HTML_DIR=/workspace/output/html
MARKDOWN_DIR=/workspace/content/blog

for file in "$HTML_DIR"/*.html; do
    filename=$(basename "$file" | cut -f 1 -d '.')
    echo "$filename"
    dir="$MARKDOWN_DIR"/"$filename"
    mkdir -p "$dir"
    img_dir="$MARKDOWN_DIR"/"$filename"/images
    mkdir -p "$img_dir"

    markdown_file="$dir"/index.md

    html_file="$HTML_DIR"/"$filename".html
		target_content=```cat $html_file | sed '/[\<pre>/,/[^\<\/pre>]*\<\/pre>/d'```
#		echo $target_content
		key="<img src="
#		key="Install"
		if [[ $target_content =~ $key ]]; then
      echo "img src in"
			echo  "$target_content" | \
    	xmllint --html --xpath '//img/@src' - | \
    	xargs -n 1 | \
    	cut -d= -f2 | \
    	sed 's/^\/\//https:\/\//' | \
    	xargs -n 1 curl -L#O --output-dir "$img_dir"
    else
    	echo "img src none"
    fi

    pandoc -o "$markdown_file" --wrap=preserve "$html_file"
    sed -i -e 's/\\-\\--\\/---/g' "$markdown_file"
    sed -i -e 's/\\"/"/g' "$markdown_file"
    sed -i -e 's/"\\/"/g' "$markdown_file"
    sed -i -e 's/\\\[/[/g' "$markdown_file"
    sed -i -e 's/\\\]/]/g' "$markdown_file"
    sed -i -e 's/]\\/]/g' "$markdown_file"
    sed -i -e "s/\\\'/'/g" "$markdown_file"
		sed  -i -e "s/https:\/\/blog.webdimension.jp\/wp-content\/uploads\/[0-9][0-9][0-9][0-9]\/[0-9][0-9]\//images\//g" $markdown_file
done