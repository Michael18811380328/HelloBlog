# Node.js 创造者 Ryan Dahl 专访

Ryan Dahl 是 Google Brain 团队的软件工程师，并且是 Node.js——一个基于 Chrome V8 引擎的服务端 JavaScript 运行环境的作者。目前他主要负责深度学习有关项目的开发。他研究的方向是图像变换，包括彩色化和超分辨率。他参与了多个开源项目包括 HTTP Paser 和 libuv。

大家好，欢迎来到“Mapping the Journey”。一说到 Node.js 我们就不得不提到一个人那就是 Ryan Dahl。他告诉我们如何使用纯异步编程模式来处理 I/O 问题。今天我非常自豪请来了 Ryan Dahl 本人，让我们掌声欢迎 Ryan。

大家好，很高兴见到大家。

Rayn 我们都知道你是 Node.js 的作者，能告诉我们你在接触技术之前的经历吧？

当然可以。我在圣地亚哥长大，我妈妈在我六岁的时候买了一台 Apple 2C，所以我很早就有机会接触电脑了。顺便说一下我现在 36 岁，所以在互联网出来的时候，我已经长大了。我在圣地亚哥的社区大学读的大学，后来去了加州大学圣地亚哥分校，在那里学习了数学。之后，我又去了罗切斯特大学的数学研究生院读硕士研究生。在那里，我研究了代数拓扑学，它是一种非常抽象的学科。起初，我发现它很有趣，但几年后我开始有点厌倦了，因为它不太适用于现实生活。硕士毕业之后，我参加了一个博士项目，当我意识到我不想做一辈子的数学家后我就退出项目组，并买了一张去南美洲的单程票。我在那里呆了一年，过着穷学生的生活，期间我和另外一个伙伴 Eric 找到了一份使用 Ruby on Rails 为一个滑雪板公司制作网站的工作。这就是我的编程生涯的起点。

哇哦，放弃博士学位，到南美旅行然后做网站开发，我想这一定是非常独特的经历！

是的，研究生的经历让我擅长处理非常抽象的问题，而网站开发工作却是一个非常具体的过程。我真的很想把这个具体过程变成一个有趣的数学理论，就像我在研究生时那样。Ruby 开发的这段经历让我开始静下心来思考如何实现这个想法。我很喜欢 Ruby 的原因是，它可以让你在开发的过程中很清晰的表达你的想法。而且我对 Rails 感兴趣的原因在于，它提出了 MVC 这个几乎全新的结构，并且将其推广开来。如何将具象的过程抽象成理论，对我来说真的很有趣。

嗯，开发 Web 应用的确非常有趣，并且 Ruby 也是个非常棒的工具了。之后你继续在德国做一名自由网站开发者，Node 是你参与的项目之一。那你在德国接下来的 6-8 个月都一直在参与开发这个项目吗？

没错。在南美呆了些日子后，因为女朋友是德国人，不得不回学校上课，所以我俩一块搬到了德国。在德国，我开始参加一些 Ruby 大会，在那里人们都在谈论 Rails 这个 MVC 的新范例。其中有一个人叫 Chris Neukirchen，他开发了一个叫做 Rack 的项目，它是 Web 服务器的简单抽象，它把 Web 服务变成了单一的函数接口，通过这个接口你收到一个请求，然后返回一个响应。恰巧之前我为 Engineyard 项目开发过 Nginx 模块。在 Nginx 上一切都是异步的，所以你开发模块时需要非常小心以免堵塞。结合 Chris Neukirchen 的 Rack 项目和 Nginx Web 服务器的非堵塞 IO 架构，让我开始思考将这两件东西结合起来。

现在你有一点关于 Nginx 和 Rack 想法，你是如何说服自己接受并执行“我将耗费接下来的 6 个月开发一个可能会大大提高性能的可以在服务器端运行 JavaScript 的框架”这个想法的？

我认为实现这个 Web 服务接口有两部分，一个是 Rack，另一个是 Nginx 异步的部分。恰逢在 2008 年 12 月 Google 发布 Chrome 浏览器，和它一起诞生的还有 V8 JavaScript 解释器，也许我不应该说它是个解释器，而应该说它是一个实时编译的运行环境。所以当 V8 引擎出来时我试用了下，它看起来非常有趣、干净、快速。这时突然我想到：对呀！JavaScript 是单线程而且异步非阻塞语言。举个例子，就像在浏览器中，人们在做 AJAX 请求时实际上就是在进行非堵塞操作。我认为 JavaScript 加异步 IO 加上一些 HTTP 服务器的东西实际上是一件非常酷的事情，我对这个想法非常兴奋，以至于我在接下来的四年里不停地为之工作

JavaScript 和异步 I/O 听起来非常酷。我相信很多开发人员都在等待看到相关实现。我只是好奇，在这段时间里你有没有和导师或者其它人商量过？还是只是你自己？

基本上就是我。我也有一些做 IT 的朋友，给了我一些有用的建议，不过主要还是我就是了。但后来，我搬到洛杉矶加入 Joyent ，和一群非常棒的同事一起工作，之后很多人的献计献策构成了如今的 Node。

这样呀，那你能给我们讲述一下 Node 开发的经历呢，自从你在 2009 年创建 Node 以来，已经过去很长时间了

至少对我自己来说，在我的生活中，没有比为自己坚信的目标而花时间努力好好工作更伟大的时刻了。我认为 Node 是一个必然会出现的项目，即使我没有实现它也会有其它的人最终会实现它。充足的时间是实现一款产品必须的因素，碰巧的是，我是自由职业者，有很多空闲时间，可以连续工作几个月。可能就是这些原因，我把它开发出来了，现在回想起来这个过程真的很棒很有趣。

哇哦，听起来太不可思议了。刚才你也说了“纯异步”编程模型是 Node 的核心思想，那么它在 Node 中是如何实现的？

我觉得这是一个非常有趣的问题。从 2012, 2013 年开始，我已经有好几年了没有亲自为 Node 提交代码了。Node 现在已经是一个大型项目了，当它第一次出现的时候，我到处走访并做了一系列的宣讲，试图让人们相信我们正在使用错误的方法处理 I/O 行为，如果我们以一种非阻塞的方式完成所有事情，那么我们就可以解决很多编程上的问题。比方说我们可以完全忘记进程，只使用线程抽象和序列化通信。在单个线程中，我们可以通过异步来处理更多请求。当时我坚信这一想法，但在过去的几年里，我觉得这可能不是最优解，尤其是 Go 语言出现后。Go 其实已经出现好长时间了，我第一次听说 Go 是 2012 年左右，他们有一个很棒的 runtime 运行环境，拥有独有的绿色进程，非常容易将“堵塞 I/O”进行线程抽象。注意这里的“堵塞 I/O”是双引号的，因为实际上堵塞都是在绿色线程接口上，Go 的绿色线程和操作系统之间的操作还是非堵塞 I/O 的，他们向用户提供的接口是阻塞形式的。我认为这是一个更好的编程模式，堵塞行为让你能更简单的理解很多情况。如果你有一系列的工作，可以这样理解：做 A 时，等待一个响应，完成后或许会抛出异常，做 B 时，等待响应，等待结构或抛出异常。但在 Node 中，这是比较困难的，因为你必须跳转到另一个函数调用中。

我喜欢 Go 的编程模型。用 goroutines 是如此简单和有趣。事实上，我们正在使用它来构建分布式应用程序。

是的，对于创建 Web 服务来说，我无法想象除了用 Go 还能用其它的语言。如果在你不需要多线程时，我认为 Node 的非阻塞模式真的很好，很多回调地狱问题，通过 async/await 得到了解决。async/await 已经添加到 JavaScript 规范中，所以在新版 Node 中这些问题会迎刃而解。**不过我认为 Node 不是构建大型 Web 服务器的最佳选择，我会建议使用 Go 来实现**。老实说，这也是我离开 Node 的原因。因为我意识到：原来 Node 并不是最好的服务器端语言。

我觉得 Node 真的发光点是用在客户端。例如：一些小服务器开发或开发服务器的实时流量服务，Node 是正确选择。**但是如果构建一个大规模分布式 DNS 服务器，我不会选择 Node 的。**

你又给大家上了一课，为项目选择正确的工具是如此重要。而且你一点也不偏袒 Node，2009 年你在柏林 JSCONF 介绍 Node 时，你有料到这突如其来的成功吗？

我基本上每年都惊讶于这件事。因为它发展得很快，人们非常喜欢它。

你入职到 Joyant 全职参与 Node 开发后就搬到旧金山去了对吧？这段时间你感觉怎么样？开发者们喜欢 Node，而你又是它的缔造者。

当然，这是我生命中一次重要的经历，在一些会议或者诸如此类的地方我完全能感受到我处在聚焦灯之下。有一次我去了日本，人们纷纷要求和我合影，感觉还蛮怪的。在网上也是，每当我在网上发表评论时，我就会得到成百上千的赞。这之后，我不得不非常谨慎地选择自己的言辞并注意自己的表现，因为大家会非常相信我的话，这是很奇怪的。我不喜欢这样，我的意思是，我是一个程序员，我想写代码，分享我的意见，而不是仔细地考虑它是不是合适。

当你向世界介绍 Node 的时候应该还只有 29, 30 岁吧？如今 Node 已经造成了巨大的影响力了。

是的，当时我也算是个新手开发者来着。

其实当时有许多服务器端 JavaScript 项目，Node 不是唯一的一个，你认为 Node 的成功是什么原因？

是的，当时也有几个人想在服务端运行 JavaScript，不过我已经忘记了到底是那些项目了。但是他们都做阻塞 I/O，这真的不适合 JavaScript。因为 JavaScript 没有多进程，如果你正在做阻塞 I/O，你实际上不能处理请求，一次只做一件事，这种逻辑那是永远不会成功的。而我喜欢让 HTTP 服务器快速运行。我有一个 demo，一个 HTTP 服务器，然后是一个原始 TCP 服务器，我让这些东西工作得很好，让人们可以安心建立网站，而不会经历太多的麻烦。坦白地说，构建一个 Web 服务器不是容易的事情，我想很多这样的系统留给社区去构建，但是没有人做。我认为有一点很重要，那就是当你发布一个软件框架，或者任何种类的软件时，你需要你有一个 demo，可以让人们立即使用。这是 Node 所做的事情之一，人们下载后可以立刻使用的 Web 服务器。

如果人们可以很容易的下载、安装和使用它将会产生很大的差异。而且，人们了解 JavaScript，他们可以很快就开始编码。

我们理所当然地认为在语言之间切换是多么容易，即使你知道另一种语言，某种程度上说，这也是相当困难的。有很多人非常熟悉 JavaScript，而且这些工具能够在其他环境中使用，突然你能做得比你以前多得多，这大大激发了开发者们的兴趣

在 2012 年，Node 已经有一个巨大的开发者基础,你为什么离开，让 Joyent 的 Isaac Schlueter 接替你掌舵呢？

这件事说起来比较复杂，主要是我已经在 Node 上工作了四年，并且已经达到了我想要的高度。我从不希望 Node 是一个非常庞大的 API。我希望它是一种小型的、紧凑的、核心的，然后人们可以在上面构建模块。还有一些关键的事情，我想支持关键的特性，有许多扩展模块是在早期添加的，所有的网络库 HTTP、UDP、TCP，我们可以访问所有的文件系统。然后有一大块工作，这可能是五个人一年的工作，把它正确的移植到 Windows 上。我们希望使用 Windows 抽象来进行异步 IO，就需要重写核心库，这样做的结果是 libuv 库产生了。但在某些时候，所有这些都完成了，我们已经在 Windows 上发布了，这就是我想创造的，我很高兴我有机会继续贯彻下去。当然，在我余下的生活中，有无数的缺陷需要修复，有足够多的人参与，因此我不需要这样做，我想去做其他事情。再加上 Go 出现的事实，我并没有看到 Node 是服务器的最终解决方案。还有一点是不想成为关注的焦点，即使是我的博客。

是的，有很多人并不喜欢站在聚光灯下。当你开发 Node 的时候，你绝对有设定一些目标。如今 Node.js 实现的怎么样了？

唔，Node 现在已经被成千上万，甚至数百万的人使用，我觉得这绝对超出了我以往的预期。

在你和 Node 的精彩旅程之后，你决定做什么？

在 Node 之后，我离开 Joyent 并退出 Node 项目，搬到了纽约，并花了一些时间去完成自己的项目。所以，我有很多项目。在当时，Instagram 已经出来了，这是新的，它似乎很简单，每个人都在说：哇，那很简单，我可以做出来。我不禁想到了同样的事情。所以，我有一个社交网络，一个 C++ 构建系统项目，我还有一个 HTML 构建系统项目，以一个聪明的方式打包你的 JavaScript 和 HTML。我有一堆的项目，在我的印象里没有一个成功的。虽然我认为它们其中一些目前仍在次要位置，像我的社交网络项目，我会在某个时候回来。我做了一会儿，然后我开始阅读卷积网络以及图像分类是如何解决的，这让我对机器学习非常感兴趣。

你也是 Google Brain 团队驻留计划的一部分。 这样的经历怎么样？

我刚刚在山景城度过了一年。回过头来，TensorFlow 已经在两年前发布了。与此同时，他们宣布了谷歌大脑驻留计划，并邀请了 20 个人来到谷歌机器学习研究实验室。这些人并不一定是真正学习机器学习的人，而是在数学和程序设计方面有一些背景，并且对机器学习感兴趣的人，他们喜欢这些新想法。因为机器学习正在快速变化，而且还有大量的工作已经完成，但现在机器学习中最有用的算法——神经网络的社区已经有所缩小，也许只是引入了一些人，尝试这个新的 ML 框架（TensorFlow），碰撞产生一些有趣的想法。我花了一年的时间创建学习模型，并发表关于这些模型的论文。我主要从事图像转换问题，如果你有一些输入图像，你想预测一些输出图像。我发现这个问题真的很有趣，例如着色的问题，你可以输入黑白照片，然后尝试预测输出照片的颜色。这个问题酷炫的地方在于需要有无限的训练数据。你可以拍摄任何彩色照片并使其饱和，然后这是你的输入图像了。机器学习的一个问题是你需要大量的数据，并且执行学习任务，这都不是大问题。近来在生成模型方面已经有做了很多工作，也就是输出图像的模型。特别是生成性对抗网络和像素卷积网络，证明了它有能力学习自然图像的多样性，就像真正了解什么是真实图像，什么不是真实图像，什么看起来像一个真实的形象。我的想法是把这个最近的工作应用在生成模型中，并采取这个无限的训练数据，看看是否可以做一些图像转换问题。我做了一些超分辨率的工作，将一个低分辨率的图像，提高分辨率，这也是图像转换问题。现在我已经完成了两个关于彩色化的项目。

非常棒的解释。我已经读到了 TensorFlow 已经成为许多机器学习问题的一个很好的平台。图像分类，转换，我真的不太明白，但我相信它很有趣。你还在继续你的工作吗？

是的，所以我现在仍然在谷歌，作为一个软件工程师，处理同样的问题，研究生成模型，并试图帮助研究人员建立下一代系统，下一代模型。

它与你之前做过的 JavaScript、Node 或者是 Web 开发工作有很大的不同？

是的，不过毕竟我是数学专业的，所以我有相当不错的数学功底。我认为人们喜欢让别人进入某些领域，我真的不想那样做。我不想成为一个 JavaScript 开发者，我也不想成为一个机器学习开发者。人们探索某些东西是很有趣的，令人兴奋的是建立一些以前从未做过的新事物，它可能在某种程度上造福人类。

是的，很高兴知道机器学习需要良好的数学背景。在最近的一篇关于乐观虚无主义的博客中，你说我们终有一天会模仿大脑，建立一个像人类一样理解和思考的机器。那么你觉得，我们离实现这一目标还有多远？

关于这种预言我必须小心一点，下面的都是我个人的观点。人工智能离人类智慧还差得远。我的意思是，我们目前使用的机器学习系统非常简单，基本上根本不起作用。我有一篇博客，其中列举了开发这些模型所遇到的所有困难。我认为那些不在这个领域工作的人会以为，只要选择了一个模型并推给它一些数据，它就可以工作了，但事实并非如此。这些东西都是非常挑剔的并且不是很好理解，即使是最温和的结果也需要很多很多个月的精心调整和实验。最近确实出现了一些有希望的技术，例如卷积网络也就是说卷积网络似乎起作用了。事实上，这些东西是建立在一个模型的基础上的，这种神经网络模型不是真正的大脑，但是它是由大脑激发出来的，是非常诱人的。我们也有 GPU，我们展示了如何在这些 GPU 上进行训练，并在一定程度上分配 GPU 上的训练。我们正在为构建更大，更智能的系统打地基。就个人而言，我是一个无神论者，我相信是一些化学物质和神经元构成了我的大脑。而我们所有的意识，通过某种方式经由神经元之间的相互作用而被编码。**因此我认为，终有一天，如果我们在这一领域进行了足够的研究工作之后，我们会模仿出这些行为。只是，目前我们离这个目标太过遥远，我也很难预测需要多长时间。**

你想在未来 20 年看到什么技术？

我对机器学习及其带来的可能性感到非常兴奋。我甚至认为，在我们接触到真正的人工智能之前，很多应用都会运用到这一技术，基本上任何系统从这项技术中都会受益。就拿现在不可计数的工业生产来说，例如：回收中心可利用计算机视觉进行分类回收，而不是像现在这样。我们将越来越多地看到这些系统被应用到不同的过程中，我认为这将极大地影响科技，并且造福全人类。

是的，机器学习是门让人兴奋的技术。当我在山景城看到自动驾驶汽车时，别提有多兴奋了。我相信有一天，我们可以不用操控汽车毫无后顾之忧的坐车上。节目的最后，让我们谢谢 Ryan 为我们带来了 Node 这么有趣的框架，并感谢他今天的访谈。

祝你之后项目一切顺利，希望之后还能再合作。

好的，也谢谢主持人，今天的访谈非常愉快

谢谢。那观众们今天就到这里啦！我非常喜欢和 Ryan 的这次访谈，他是一位非常谦逊完美的人，他实现的技术成就也会永远的激励着我们。两周后我们不见不散。

PS：这哥们一看就是一个技术宅，他说他创建的 Node.js 没有 GO 语音在服务端好用。
