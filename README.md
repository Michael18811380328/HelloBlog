# Michael An 的个人站点

这是 Michael An 的 个人站点，欢迎大家交流。

写下十件重要的事情，然后只做好三件！

主要精力放在架构和算法上！

注：现在增加了 mkdocs minify 插件，基本效果可以，可以把 HTML 中的空格等压缩掉，减少加载的体积

但是某些 markdown 文件不标准，所以无法最小化，错误日志如下：

需要想一下如何解决

~~~txt
Error building page 'nodejs/17-Node.js GETPOST请求.md':
Traceback (most recent call last):
  File "/Users/seafile/workroom/Vitualenv/py3env/bin/mkdocs", line 8, in <module>
    sys.exit(cli())
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/click/core.py", line 829, in __call__
    return self.main(*args, **kwargs)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/click/core.py", line 782, in main
    rv = self.invoke(ctx)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/click/core.py", line 1259, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/click/core.py", line 1066, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/click/core.py", line 610, in invoke
    return callback(*args, **kwargs)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/mkdocs/__main__.py", line 183, in build_command
    build.build(config.load_config(**kwargs), dirty=not clean)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/mkdocs/commands/build.py", line 306, in build
    _build_page(file.page, config, doc_files, nav, env, dirty)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/mkdocs/commands/build.py", line 221, in _build_page
    'post_page', output, page=page, config=config
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/mkdocs/plugins.py", line 94, in run_event
    result = method(item, **kwargs)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/mkdocs_minify_plugin/plugin.py", line 79, in on_post_page
    return minify(output_content, opts.get("remove_comments", False), opts.get("remove_empty_space", False), opts.get("remove_all_empty_space", False), opts.get("reduce_empty_attributes", True), opts.get("reduce_boolean_attributes", False), opts.get("remove_optional_attribute_quotes", True), opts.get("convert_charrefs", True), opts.get("keep_pre", False), opts.get("pre_tags", ('pre', 'textarea')), opts.get("pre_attr", 'pre'))
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/htmlmin/main.py", line 105, in minify
    minifier.feed(input)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/htmlmin/python3html/parser.py", line 125, in feed
    self.goahead(0)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/htmlmin/python3html/parser.py", line 185, in goahead
    k = self.parse_starttag(i)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/htmlmin/python3html/parser.py", line 359, in parse_starttag
    self.handle_starttag(tag, attrs)
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/htmlmin/parser.py", line 271, in handle_starttag
    self._in_pre_tag -= self._close_tags_up_to(t[0])
  File "/Users/seafile/workroom/Vitualenv/py3env/lib/python3.7/site-packages/htmlmin/parser.py", line 254, in _close_tags_up_to
    raise OpenTagNotFoundError()
htmlmin.parser.OpenTagNotFoundError
~~~

