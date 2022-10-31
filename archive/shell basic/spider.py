#coding=utf-8
import requests
from bs4 import BeautifulSoup
import io

print('spider start')
# https://www.runoob.com/python/python-exercise-example1.html
filename = 'result.txt'
with open(filename, 'w') as file_object:

  articles = [
    'https://www.runoob.com/linux/linux-shell.html',
    'https://www.runoob.com/linux/linux-shell-variable.html',
    'https://www.runoob.com/linux/linux-shell-passing-arguments.html',
    'https://www.runoob.com/linux/linux-shell-array.html',
    'https://www.runoob.com/linux/linux-shell-basic-operators.html',
    'https://www.runoob.com/linux/linux-shell-echo.html',
    'https://www.runoob.com/linux/linux-shell-printf.html',
    'https://www.runoob.com/linux/linux-shell-test.html',
    'https://www.runoob.com/linux/linux-shell-process-control.html',
    'https://www.runoob.com/linux/linux-shell-func.html',
    'https://www.runoob.com/linux/linux-shell-io-redirections.html',
    'https://www.runoob.com/linux/linux-shell-include-file.html',
  ]
  
  for page in range(1, 12):
    str = articles[page]
    print(str)
    r = requests.get(str)
    r.encoding='utf-8'
    r.encoding=None
    data = BeautifulSoup(r.text,'html.parser').find_all('div',class_='article-body')
    for j in data:
      file_object.write("%s\n\n" % (j.text))
print('spider end')
