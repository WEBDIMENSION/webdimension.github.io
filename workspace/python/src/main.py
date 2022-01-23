import MySQLdb
from MySQLdb.cursors import DictCursor
import os
from lib import functions


# import subprocess
# from os.path import join, dirname
# from dotenv import load_dotenv

# print(type(os.environ))

# load_dotenv(verbose=True)
# dotenv_path = join(dirname(__file__), '.env')
# print(dotenv_path)
# load_dotenv(dotenv_path)
DB_HOST = os.getenv('MYSQL_IP')
DB_PORT = int(os.getenv('MYSQL_INTERNAL_PORT'))
DB_NAME = os.getenv('MYSQL_DATABASE')
DB_USER = os.getenv('MYSQL_USER')
DB_PASSWORD = os.getenv('MYSQL_PASSWORD')
DB_ROOT_PASSWORD = os.getenv('MYSQL_ROOT_PASSWORD')
#  Display ENV
display_env = False
if display_env:
    print(os.environ)
    print('Host: ' + DB_HOST)
    print('port: ' + str(DB_PORT))
    print('DB: ' + DB_NAME)
    print('user: ' + DB_USER)
    print('pass: ' + DB_PASSWORD)
    print('root_pass: ' + DB_ROOT_PASSWORD)

conn = MySQLdb.connect(user=DB_USER, passwd=DB_PASSWORD, host=DB_HOST, db=DB_NAME, port=DB_PORT)
cur = conn.cursor(DictCursor)
# cur.execute("show tables")
# rows = cur.fetchall()
# print(rows)


sql = """

SELECT p.id
     , p.post_date
     , p.post_content
     , p.post_title
     , p.post_excerpt
     , p.post_status
     , p.post_name
     , p.post_modified
     , tm.object_id
     , tm.term_taxonomy_id
     , tt.term_id
     , tt.taxonomy
     , t.name
     , t.slug
FROM wp_posts p
         LEFT JOIN wp_term_relationships tm
                   ON p.ID = tm.object_id
         LEFT JOIN wp_term_taxonomy tt
                   ON tm.term_taxonomy_id = tt.term_taxonomy_id
         LEFT JOIN wp_terms t
                   ON tt.term_id = t.term_id
WHERE p.post_status = 'publish'
  AND p.post_type = 'post'
order by p.id asc
;
"""
cur.execute(sql)
rows = cur.fetchall()
# print(type(rows))
current_id = 0
categories = []
tags = []
row_value = ''
for row in rows:
    if current_id != row['id']:
        if current_id != 0:
            functions.generate(categories, tags, row_value)
        current_id = row['id']
        categories = []
        tags = []
        row_value = row

    if row['taxonomy'] == 'category':
        categories.append(row['name'])
    if row['taxonomy'] == 'post_tag':
        tags.append(row['name'])
functions.generate(categories, tags, row_value)

conn.close()
