
# AI 大模型

原始教程链接: https://aistudio.baidu.com/education/group/info/28604

## 概述


#### AI 概述

<https://www.zhihu.com/question/599713780/answer/3055040756>

介绍了 GPT1-4的论文和主要变化，深度学习等概念，目前论文下载好了，阅读难度比较大。整体上需要扎实的 Python 基础，扎实的数据结构和算法基础，扎实的统计概率基础等。直接学习核心原理比较困难，学习思维以及 python 基本的逻辑是很重要的。个人目标：AI 如何提升程序员的工作效率？如何在其他场景中使用这个技术？争取自己做出一个 demo，可以部署在小说阅读器项目中

#### 学习资料

各种资料，选择最好的

<https://www.zhihu.com/education/video-course/1556316449043668992> 

<https://www.zhihu.com/education/learning> 




## 知乎-01使用 Assistant 搭建 AI 助手
链接：<https://www.zhihu.com/education/training/course-detail/1744009771047370752> 

来源：知乎在线视频，简单介绍 GPT assistant 如何搭建一个 AI 助手，概述 + demo

讲师是一个创业失败的产品经理出身，也干过一点技术，这个就是入门介绍

#### 和 AI 大模型相关的四种人

1、底层开发工程师：训练基础大模型 GPT4，为大模型提供硬件层面的算力（英伟达），门槛很高

2、AI 开发程序员：编程实现 AI 工具——重点目标

3、AI 产品经理：给用户设计AI程序，或者给自己设计AI程序

4、用户

AI能力的上限是使用者的判断力。AI很强，那么用户需要足够强，才能生效。如果用户能力不强，那么AI发挥效果发挥不出来（AI辅助编程，那么原始用户的编程能力应该需要很强）。

#### 大模型应用的知识体系

大模型应用的技术架构如下，从简单到复杂又四种应用。

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1708998901968.png)

应用1：应用程序直接输入 prompt 调用基础大模型 API，基础大模型返回 response，可以理解为静态固定的数据（使用市面上已知的开源基础大模型训练的结果）

应用2：在1的基础上，加入了外部第三方 APIs，例如百度地图 API，或者微信 API。那么基础大模型就可以调用特定服务器的 API，然后完成特定的操作（导航，分享朋友圈等）下面做的 demo 就是这个级别的应用。agent 智能体：大模型向 server 发送要求（应用程序应该调用某个API获取某个信息）的部分。大模型是静态的数据，没有直接访问外部API的能力，所以通过应用程序执行这个外部API。例如：明天出门是否带伞？先向API查询明天北京的天气，查询到结果之后才能确定是否带伞。

应用3：进一步增加了 RAG。传统的知识体系是 mysql 关系型数据库，现在很多外部知识库是特定的数据结构（例如实时爬虫爬取的新闻数据），先把这部分知识转换成向量数据库，然后已有大模型调用这部分数据库。

> 检索增强生成（Retrieval-augmented Generation，RAG），是当下最热门的大模型前沿技术之一。如果将“微调（fine tune）”理解成大模型内化吸收知识的过程，那么RAG就相当于给大模型装上了“知识外挂”，基础大模型不用再训练即可随时调用特定领域知识。
>
> 向量数据库是一种特殊的数据库，它具备数据存储和读取的基础能力，同时也有一个特殊的查询操作，即向量检索。类似的是 redis 向量检索。

应用4：加入微调。很多实际行业场景和基础大模型有出入，那么需要对实际行业的参数进行微调和限制。这部分也是提高精度的重要因素，也是现在很多应用岗位实际做的事情。

具体的知识点：Embedding: 相似度计算、聚类分析、词向量、句子向量，这部分比较基础和底层

#### 提供 Assistant API 的框架 streamLit

这个应用可以调用 openai 的接口，使用自定义的 API 对基本功能进行扩展。

框架：streamLit 更方便快速的搭建分享应用，是一个入门简单的 python 框架，直接给配置即可，不需要考虑路由等细节。

Assistant = Thread（界面交互的UI，一串对话） + Run(内部逻辑，包括获取信息，AI 执行，显示返回结果)

AI Client —— Assistant —— Thread —— message  —— server run —— response

每一个类都有很多 API，直接调用即可（实际生产项目使用自己实现）

#### Demo 滴滴打车

config.toml

```
[server]

# 允许访问本地静态资源（图片和 favicon）
enableStaticServing = True

```

utils.py 自定义的 API，AI 可以直接调用

```python
# coding=utf-8
# by Michael An
import time
import streamlit as st

def get_current_time(*arg, **kwargs):
	# API 返回自然语言，不能返回对象，模型不能理解对象
	return f'现在时间是{time.strftime(format: "%H:%M:%S", time.localtime())}'

def random_placeholder_text():
	text_list = [
		'Your message',
		'Say hello',
	]
	return text_list[int(time.time()) % len(text_list)]

# user avatar setting
ICON = 'static/avatar.png'
ICON_USER = 'user'

def append_and_show(role, content):
	"""
	将消息添加到 messages 列表中，并展示
	role: 角色， assistant or user
	content: 消息内容
	"""
	st.session_state.message.append({"role": role, "content": content})
	
	st.chat_message(role, avatar = ICON if role == 'assistant' else ICON_USER).write(content)

if __name__ == '__main__':
	print(random_placeholder_text())

```

第三方给出的 server API 地图

```python
# 高德地图 API
# 获取开始和结束的经纬度和 POI ID 
# 获取开始和结束的驾车时间和距离

import requests

map_key = '123'

def get_poi_id(address):
	params = {
		'key': key,
		'keywords': address
	}
	response = response.get('https://restapi.amap.com/v5', params=params)
	location = response.json()['pois'][0]['location']
	poi_id = response.join()['pois'][0]['id']
	return location, poi_id

def get_distance_time(origin, destination):
	origin_location, origin_id = get_poi_id(origin)
	destination_location, destination_location = get_poi_id(destination)
	params = {
		'key': key,
		'origin': origin_location,
	}

```

主函数：

```python
import json
import logging

from dotenv import load_dotenv
from openai import OpenAI

from tools.utils import *
from tools.amsp import get_distance_time

load_dotenv()

logging.basicConfig(level=logging.INFO)

# 初始化 client
client = OpenAI()

availavle_functions = {     'get_current_time':
get_current_time,     'get_distance_and_duration':
get_distance_time, }

# 获取创建好的 assistant
assistant = client.beta.assistants.retrive('token-xxxxxxxxx')

# streamlit 初始化
st.set_page_config(
	page_title="打车车费估算模型",
	page_icon="icon",
)

# 初始展示
st.caption('使用 open AI Assistant 结合其他技术，实现打车 demo')

if "message" not in st.session_state:
	st.session_state["message"] = [
		{
			"role": "assistant",
			"content": "我是打车助手"
		}
	]
# 
if "thread" not in st.session_state:
	thread = client.beta.threads.create()
	st.session_state['thread'] = thread

for msg in st.session_state.messages:
	st.chat_message(msg["role"], avatar=ICON if msg["role"] == 'assistant' else ICON_USER).write(msg['content'])

# 核心逻辑
if prompt := st.chat_input():
	append_and_show("user", prompt)
	message = client.beta.threads.messages.create(thread_id=st.session_state.thread.id, role="user", content=prompt)
	run = client.beta.threads.runs.create(thread_id=st.session_state.thread_id, assistant_id=assistant.id)

	# 轮训（忽略了处理细节）
	while True:
		try:
			# 轮训等待，更新run状态
			if run.status == 'queued' or run.status == 'in_progress':
				pass
			# 执行本地方法
			elif run.status == 'requires_action':
				pass
			# 完成后，显示最新消息
			elif run.status == 'completed':
				pass

		except Exception, e:
			logger.error(e)
			raise

```

因为这是一个 demo 介绍，代码就忽略了很多技术细节

局限性：没有处理用户恶意调用 API 问题（调用API 费钱）；没有处理安全合规问题等；没有更多的逻辑推断能力，格式不完美等等。所以这里需要高质量的 Prompt 提示词工程；没有处理图片视频音频等问题。

#### 大模型对未来职业的影响

1、基本应用：单行代码提示

2、copilot: 提示一个函数或者一个模块

3、交互：支持上下文交互效果

4、社交性：模型不断学习新的数据库，从对话中学习 

后续系列课程付费，这节课大概了解了 Assistant API 和基础概述

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709021517069.png)




## 知乎-02大模型核心概述 + LangChain
### Prompt Engineer 提示词工程

prompt 告诉大模型要做什么

怎样用在代码中（单轮问答，多轮交互）

#### 案例

```python
def example():
  instruction = """帮我写一个课程框架,主题是react.js课程框架,200字."""
  prompt = f"""{instruction}"""
  response = getResponse(prompt)
  print(response)

# 基于 prompt 生成文本
def getResponse(prompt, model='gpt-3.5-turbo-16k-0613'):
  # messages 列表（存放对话信息）
  # 目前支持单轮对话
  messages = [
    {
      'role': 'user',
      'content': prompt,
    }
  ]
  response = openai.ChatCompletion.create(
    model=model,
    messages=messages,
    temperature=0,
  )
  return response.choices[0].message['content']

```

API 中主要的参数和说明：

model: 使用 GPT 的模型，默认是 gpt3.5 模型

messages: 对话数组。role 表示角色，支持 user, assistant, system 三种情况。assistant 表示 GPT 返回来的信息。system 表示环境系统变量，系统预先设置的信息。例如：你现在是一个化学老师，只能解答化学有关的问题。

tempetature: 温度，temperature 表示随机性，0最小，2最大，默认较小值0。如果给到 1.8 那么答案天马行空。

这里还有其他的参数，根据官方文档使用

#### 注意点：

* 内容审核：harassment: true or false 对于不同类型骚扰如何处理

### LangChain 大模型 pyhton 框架

LangChain 是一个面向大模型的开发框架，使用简单配置即可实现复杂的 AI 应用。内部封装了很多组件（网络模块）。可以把大模型和外部数据结合起来，输入自己的知识库，定制化大模型。

中文文档：<https://www.langchain.com.cn/> 

基本介绍：<https://zhuanlan.zhihu.com/p/644500258> 

使用 node 开发：<https://js.langchain.com.cn/docs/getting-started/guide-llm> 

未来可以把这个放在阅读器中，自己写一个助手

关键申请一个 OPENAI_API_KEY 然后直接调用即可 

#### IO 模块

这里的 IO 和计算机的 IO 输入设备输出设备无关，指的是向大模型输入和输出的模块，就是应用和大模型的接口。

* prompts：可以直接处理多种模型，不需要考虑不同模型的差异化，减少了程序员处理工作
* outputs: 解析输出的结果，分成普通的 LLM 和对话式的 chat_model，如下
* language model： 使用哪种语言模型进行解析

```python
# prompts：可以直接处理多种模型
from langchain import PromptTemplate

prompt_template = PromptTemplate.from_template(
	"Tell me a {adj} joke about {content}."
)

prompt_template.format(adj="funny", content="kids")

```

```python
# model = LLM
prompt_template.format(adj="funny", content="kids")

from langchain.llms import OpenAI

llm = OpenAI()

print(llm.predict('Hello, '))

```

```python
# model = chat_models
from langchain.chat_models import ChatOpenAI

chat_model = ChatOpenAI()

print(chat_model.predict('Hello, '))

```

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709388527210.png)

#### 数据连接模块

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709388589136.png)

load: 加载数据，支持多种格式 Document loader(cvs, html, file, json, pdf)

```python
from langchain.document_loaders import PyPDFLoader

loader = PyPDFLoader("test.pdf")
pages = loader.load_and_split()

print(pages[0].page_content)

```

transform: split（把数据切成块，就是上面的 split() 函数） + translate(把输入翻译成指定语言)

embed: 数据向量化，模型无法直接阅读文本或者字符串，只能处理数值。所以使用机器学习的方法，从数据中进行特征值提取，变成一个高维的数据（向量或者张量）

store：把向量存储后，和已有的数据集中的向量进行对比，比较相似程度，找到最相似的结果（判别）相似度的计算原理：两个点的距离是欧氏距离，两个向量的距离是余弦距离。

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709389282902.png)

memory 模块：记忆化模块：与多轮对话强相关。使用已有的对话，训练出下一个结果。把下一个结果 message 作为参数（或者处理后的结果），继续询问大模型，就是记忆化模块。类似上下文处理。

```python
from langchain.memory import ConversationBufferMemory

history = ConversationBufferMemory()
history.save_context({'input': 'hello'}, {'output': 'hi'})

# 注意：这里需要传参，是空的字典
print(history.load_memory_viriables({}))

history = ConversationBufferMemory()
history.save_context({'input': 'hi'}, {'output': 'hello'})

# 输出两轮对话
print(history.load_memory_viriables({}))

```

处理特别长的对话，使用另一个方法，增加最大队列长度

```python
from langchain.memory import ConversationBufferWindowMemory

window = ConversationBufferWindowMemory(k=3)

window.save_context({'input': 'hi'}, {'output': 'hi'});
window.save_context({'input': 'hi'}, {'output': 'hi'});
window.save_context({'input': 'hi'}, {'output': 'hi'});
window.save_context({'input': 'hi'}, {'output': 'hi'});
window.save_context({'input': 'hi'}, {'output': 'hi'});

print(window.load_memory_variables({})) #3


# 总结前几轮的对话结果
from langchain.memory import ConversationSummaryMemory
from langchain.llms import OpenAI

memory = ConversationSummaryMemory(
	llm=OpenAI(tempetature=0)
)

memory.save_context(
	{'input': 'hello'},
	{'output': 'hello, I am your AI assistant'}
)

print(memory.load_memory_variables({}))


```

### Fine-tuning 微调

一般人和团队，没有时间和能力去从头训练一个大模型，所以就基于已有大模型进行微调。

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709391223422.png)

```python
from finetune import ModifiedTrainer, data_collator
from transformers import TrainingArguments

training_args = TrainingArguments(
	"output",
	fp16 = True,
	gradient_accumulation_steps = 1,
	seed = 0,
	data_seed = 0,
	group_by_length = False,
)

trainer = ModifiedTrainer(
	model=model,
	train_dataset=dataset,
	args=training_args,
	data_collator=data_collator
)

trainer.train()


```






## 陆奇-新范式新时代新机会
<https://miracleplus.feishu.cn/file/TGKRbW4yrosqmixCtprcUlAynzg> 

陆奇最新演讲《新范式新时代新机会》完整PPT.pdf 可以扫码查看视频回放

#### 新时代新范式

最下面一层是技术发展史，技术的发展促进了模型的变化

第一阶段：信息系统（计算机仅仅存储信息+人类观察总结模型+人类和环境交互）

第二阶段：模型系统（计算机把数据整理成一部分知识模型，例如百度地图会把基础的 GPS 和坐标转换成地图和导航，实际还需要人类和环境交互）

第三阶段：行动系统（计算机支持大模型，把很多知识模型整合成大模型，信息-模型-行动）例如自动驾驶，智能化更通用。

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709953034247.png)

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709956184126.png)

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709956190929.png)

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709956212209.png)

新范式下面有很多新机会

技术层面和对应的新产品

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709957285261.png)

![](https://cloud.seatable.cn/workspace/81910/asset/b0de7002-5abf-48b9-b07b-ba7033be74a7/images/auto-upload/image-1709957292863.png)

后半部分是创业团队的发展过程




## 百度-1. 开始构建你的优质Prompt
<https://aistudio.baidu.com/education/lessonvideo/5168098> 

### 概念

大模型：LLM 是基于深度学习训练的模型（类似一个函数集）

提示词：Prompt 如何向大模型提问题，或者做出引导，让大模型更好的使用

AI 大模型的价值：已经在艺术创作（文字，图片）获得很多成就，大模型数据集可以出售，也提供了很多新岗位

大模型 Large-scale Model / Large Model

大模型是指具有大规模、高维度、复杂性强等特点的机器学习模型。随着数据量的增加和计算能力的提升，大模型在自然语言处理、计算机视觉、语音识别等领域得到了广泛应用。大模型的训练需要大量的数据和计算资源，同时也需要对模型进行优化和压缩，以便在实际应用中能够高效地运行。在自然语言处理领域，大模型一般指大规模语言模型。

### 历史发展

传统模型：RNN、CNN 为主的神经网络算法（2012年）

预训练模型：transformer 网络、Bert 和 GPT 1.0 为主（2020）、encoder

大模型：GPT 3.0  decoder，LLM，自回归模型

### 使用场景

1、创建大模型：类似 GPT 和文心一言，从0到1创建基础大模型。

2、基于已有大模型，训练适合某个行业或者某个企业的大模型。

3、基于已有大模型的技术，创建 AI + 其他行业 APP 或者第三方应用（例如用在医疗，教育，美术，游戏行业等）。

目前主要学习第二种和第三种使用场景。




