from jinja2 import Template, Environment, FileSystemLoader
import pathlib

def replace_nr(str):
    return str\
        .replace('\n', '')\
        .replace('\r', '')\
        .replace('"', '')

def generate(categories_list, tags_list, row_val):
    print('change id' + str(row_val['id']))
    path_tpl = (pathlib.Path(__file__).parent.parent / 'tpl').resolve()
    # print(path_tpl)
    env = Environment(loader=FileSystemLoader(str(path_tpl )))
    tpl = env.get_template('format.j2')
    print(row_val['post_title'])
    expect = replace_nr(row_val['post_excerpt'])
    post_title = replace_nr(row_val['post_title'])
    # print(expect)
    rendered_s = tpl.render(
        post_title=post_title,
        post_date=row_val['post_date'],
        post_expect=expect,
        post_content=row_val['post_content'],
        categories=categories_list,
        tags=tags_list
    )
    output_path = '/workspace/output/html/' + row_val['post_name'] + '.html'
    # print(output_path)
    f = open(output_path, 'w')
    f.write(rendered_s)
    f.close()
