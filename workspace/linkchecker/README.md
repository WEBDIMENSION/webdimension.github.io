# Linkchecker

 ```bash
linkchecker -o text -Fhtml/report/linkchecker.report.html http://gatsby:9000/
 ```

```bash
linkchecker -o text -Fsitemap/report/linkchecker.report.sitemap http://gatsby:9000/
```

```bash
linkchecker --no-status -v  -o text -Fcsv/report/linkchecker.report.csv http://gatsby:9000/
```

```bash
linkchecker -o text -Fsql/report/linkchecker.report.sql http://gatsby:9000/
```

```bash
linkchecker -o text -Fdot/report/linkchecker.report.dot http://gatsby:9000/
```

```bash
linkchecker -o text -Ffailures/report/linkchecker.report.failures http://gatsby:9000/
```

docker-compose run --rm http://gatsby:9000/