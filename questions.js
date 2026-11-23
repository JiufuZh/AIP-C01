const QUESTION_BANK = [
  {
    "id": 1,
    "stem": "一家零售公司拥有一款使用Amazon Bedrock的生成式AI（GenAI）产品推荐应用程序。该应用程序会根据客户的浏览记录和人口统计信息向客户推荐产品。公司需要在多个人口统计群体之间实现公平性评估，以检测和衡量两种提示词方案在推荐结果中的偏差。公司希望实时收集并监控公平性指标。如果公平性指标显示不同人口统计群体之间的差异超过15%，公司必须收到警报。公司还需要每周收到对比两种提示词方案性能的报告。\n以下哪种解决方案满足这些需求，同时需要的自定义开发工作量最少？",
    "options": {
      "A": "配置Amazon CloudWatch控制面板显示Amazon Bedrock API调用的默认指标。基于模型输出创建自定义指标。设置Amazon EventBridge规则，调用AWS lambda函数对模型响应执行后处理分析，并发布自定义公平性指标。",
      "B": "在Amazon Bedrock Prompt Management中创建两个提示词变体。使用Amazon Bedrock Flows按定义的流量分配部署这些提示词变体。配置带有内容过滤器的Amazon Bedrock防护栏，以监控人口统计公平性。在GuardrailContentSource维度上设置Amazon CloudWatch警报，使用InvocationsIntervened指标检测推荐差异阈值违规。",
      "C": "设置Amazon SageMaker Clarify分析模型输出。将公平性指标发布到Amazon CloudWatch。创建CloudWatch复合警报，结合SageMaker Clarify偏差指标和Amazon Bedrock延迟指标，提供全面的公平性评估控制面板。",
      "D": "创建Amazon Bedrock模型评估任务，对比两种提示词变体之间的公平性。在Amazon CloudWatch中启用模型调用日志。针对每个人口统计组，为InvocationsIntervened指标设置CloudWatch警报。"
    },
    "answer": [
      "C"
    ],
    "page": 1,
    "explanation": "C 直接衡量不同人群的推荐结果，可分别为两个提示词计算偏差指标并交给 CloudWatch 告警。社区对「实时」有分歧。Clarify 的常规监控按时间窗口运行，选项 C 也没说明周报的调度。实际系统还要定义 15% 的计算口径并补齐这些环节。延迟指标不能替代公平性指标。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 2,
    "votes": {
      "C": 62,
      "A": 18,
      "D": 15,
      "B": 6
    },
    "optionNotes": {
      "A": "Lambda 可以按分群计算自定义指标，但团队要自己编写、部署和维护计算逻辑。Bedrock 的默认指标只反映调用等运行情况。",
      "B": "提示词变体可以用于比较推荐策略。Guardrails 的 InvocationsIntervened 统计触发干预的调用次数，无法据此计算各群体的推荐率差异。",
      "C": "Clarify 提供分群偏差分析。若两组获推荐比例分别为 60% 和 40%，用百分点差衡量就相差 20 个百分点。将约定的差异指标与 15% 阈值比较，才能触发有效的告警。",
      "D": "评估作业可按数据集比较两个提示词，但调用日志和护栏干预次数仍缺少持续、分群的公平性统计。"
    },
    "references": [
      {
        "title": "AWS · Clarify 偏差监控与时间窗口",
        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift.html"
      },
      {
        "title": "AWS · Guardrails 监控指标",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring-guardrails-cw-metrics.html"
      },
      {
        "title": "AWS · CloudWatch 复合告警",
        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html"
      }
    ],
    "questionPage": 1
  },
  {
    "id": 2,
    "stem": "某金融公司正在开发一款AI助手，帮助客户规划投资和管理投资组合。该公司识别出若干高风险对话模式，例如要求提供具体股票推荐或保证收益。如果公司无法实施适当控制，高风险对话模式可能导致违规。\n公司必须确保AI助手不提供不当金融建议、不生成关于竞争对手的内容，也不做出没有事实依据、不符合公司获批金融指引的主张。公司希望使用Amazon Bedrock Guardrails来实现该解决方案。\n哪组步骤组合可以满足这些要求？（请选择三项）",
    "options": {
      "A": "将高风险对话模式添加到拒绝主题防护规则中。",
      "B": "配置内容过滤器防护规则，过滤包含高风险对话模式的提示词。",
      "C": "配置内容过滤器防护规则，过滤包含竞争对手名称的提示词。",
      "D": "将竞争对手名称添加为自定义词过滤。将输入和输出操作设置为拦截。",
      "E": "设置较低的接地分数阈值。",
      "F": "设置较高的接地分数阈值。"
    },
    "answer": [
      "A",
      "D",
      "F"
    ],
    "page": 2,
    "explanation": "把三条业务规则分别落到对应机制。A 根据对话含义拦截荐股、保证收益等话题。D 用自定义词表拦截输入和输出中列出的竞争对手名称。F 将获批指引作为依据，提高回答通过上下文核验所需的最低分数。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 4,
    "votes": {
      "ADF": 100
    },
    "optionNotes": {
      "A": "推荐某只股票、保证收益等话题有多种表达方式，拒绝主题能按语义识别。",
      "B": "通用有害内容分类不等同于公司的投资建议禁令。",
      "C": "竞争对手名称是已知词表，通用内容类别无法精确表达这份名单。",
      "D": "将具体名称列入自定义词表，并同时检查用户输入和模型输出，可直接拦截命中的名称。",
      "E": "阈值越低，通过所需的依据分数越低，放过依据不足回答的风险随之上升。",
      "F": "用公司批准的指引作为参考，要求更高的依据分数再放行，可以收紧事实依据要求。"
    },
    "references": [
      {
        "title": "AWS · 拒绝主题",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"
      },
      {
        "title": "AWS · Guardrails 的过滤类型",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-components.html"
      },
      {
        "title": "AWS · 上下文依据分数与阈值",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
      }
    ],
    "questionPage": 1
  },
  {
    "id": 3,
    "stem": "某公司部署了一个AI助手作为React应用程序，该应用使用了AWS Amplify、AWS AppSync GraphQL API和Amazon Bedrock知识库。应用程序通过GraphQL API调用Amazon Bedrock RetrieveAndGenerate API来实现知识库交互。该公司配置了一个AWS Lambda解析器使用RequestResponse调用类型。\n应用程序用户报告出现频繁超时和响应缓慢的问题。对于需要更长处理时间的复杂问题，用户更频繁地遇到这些问题。\n该公司需要一个解决方案来修复这些性能问题并提升用户体验。\n哪个解决方案可以满足这些需求？",
    "options": {
      "A": "使用AWS Amplify AI Kit实现GraphQL API的流式响应，并优化客户端渲染。",
      "B": "增加Lambda解析器的超时值。使用指数退避实现重试逻辑。",
      "C": "更新应用程序，将API请求发送到Amazon SQS队列。更新AWS AppSync解析器以轮询和处理队列。",
      "D": "将RetrieveAndGenerate API更改为InvokeModelWithResponseStream API。更新应用程序，使用Amazon API Gateway WebSocket API来支持流式响应。"
    },
    "answer": [
      "A"
    ],
    "page": 2,
    "explanation": "将生成中的文本通过 AppSync 订阅逐段送到 React 页面，用户可以在后端生成完整回答前开始阅读。讨论中的 D 也采用流式响应，但单独调用 InvokeModelWithResponseStream 会跳过原有知识库检索。若直接使用知识库接口，RetrieveAndGenerateStream 能保留检索和引用。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 6,
    "votes": {
      "A": 67,
      "D": 33
    },
    "references": [
      {
        "title": "AWS · 知识库的流式检索与生成",
        "url": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_RetrieveAndGenerateStream.html"
      }
    ],
    "questionPage": 2
  },
  {
    "id": 4,
    "stem": "一家电商企业运营着一套全球化产品推荐系统，该系统需要根据监管要求、成本优化和性能需求，在Amazon Bedrock中的多个基础模型（FM）之间切换。企业必须基于专有业务逻辑应用自定义控制规则，包括动态成本阈值、AWS特定区域合规规则，以及跨多个基础模型的实时A/B测试。该系统必须能够在不部署新代码的情况下切换基础模型，并且必须根据复杂规则路由用户请求，这些规则包括用户层级、交易价值、监管区域和实时成本指标，这些指标每小时都会变化，并且需要立即在数千个并发请求中生效。\n以下哪种方案能够满足这些要求？",
    "options": {
      "A": "部署一个AWS Lambda函数，使用环境变量存储路由规则和Amazon Bedrock FM ID。当业务需求发生变化时，通过Lambda控制台更新环境变量。配置Amazon API Gateway REST API读取请求参数来做出路由决策。",
      "B": "部署Amazon API Gateway REST API请求转换模板，基于请求属性实现路由逻辑。将Amazon Bedrock FM端点存储为REST API阶段变量。当系统需要在模型间切换时更新这些变量。",
      "C": "配置一个AWS Lambda函数，通过AWS AppConfig Agent为每个用户请求获取路由配置。在Lambda函数中运行业务逻辑，为每个请求选择合适的FM。通过单个Amazon API Gateway REST API端点暴露该FM。",
      "D": "为Amazon API Gateway REST API使用AWS Lambda授权器，评估存储在AWS AppConfig中的路由规则。基于业务逻辑返回授权上下文。将请求路由到对应每个Amazon Bedrock FM的、模型专属的Lambda函数。"
    },
    "answer": [
      "C"
    ],
    "page": 3,
    "explanation": "把成本阈值、允许区域和 A/B 比例保存在 AppConfig，Lambda 读取当前配置后按请求选择模型。业务规则变化时可以独立发布配置。Agent 使用本地缓存和轮询，规则在各实例的实际生效时间取决于发布策略和刷新间隔。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 8,
    "votes": {
      "C": 100
    },
    "references": [
      {
        "title": "AWS · AppConfig Agent 缓存与轮询",
        "url": "https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-agent.html"
      }
    ],
    "questionPage": 2
  },
  {
    "id": 5,
    "stem": "某公司正在开发一款内部生成式AI（GenAI）助手，该助手使用Amazon Bedrock为多个业务部门汇总企业文档。此GenAI助手必须以统一格式生成响应，格式要求包含文档摘要、业务风险分类以及需要标记审查的术语。GenAI助手还必须针对各用户所在业务部门（例如法务、人力资源或财务）调整响应语气，同时必须拦截仇恨言论、不当主题以及个人健康信息这类敏感信息。\n该公司需要一个解决方案来集中管理跨业务部门和团队的提示词变体，希望最大限度减少后处理逻辑的持续编排工作和维护工作量，并且希望能够随时间调整GenAI助手的内容审核标准。\n哪个解决方案能够以最低的维护开销满足这些需求？",
    "options": {
      "A": "使用Amazon Bedrock Prompt Management配置可重复使用的模板和特定业务部门的提示词变体。应用带有类别过滤器和敏感术语列表的Amazon Bedrock guardrails来拦截违禁内容。",
      "B": "使用Amazon Bedrock Prompt Management定义基础模板。通过系统提示词变量强制实现特定业务部门的语气。配置Amazon Bedrock guardrails应用基于受众的阈值调优。通过内部管理API管理guardrails。",
      "C": "在API调用中使用Amazon Bedrock注入基于业务部门的指令。将响应格式规则存储在Amazon DynamoDB中。使用AWS Step Functions验证响应。在GenAI助手生成响应后，使用Amazon Comprehend应用内容过滤器。",
      "D": "将自定义提示词模板存储在Amazon DynamoDB中，配合使用Amazon Bedrock。创建一个AWS Lambda函数来选择特定业务部门的提示词。创建第二个AWS Lambda函数来调用Amazon Comprehend，从响应中过滤违禁内容。"
    },
    "answer": [
      "A"
    ],
    "page": 3,
    "explanation": "可复用的提示模板规定共同的摘要字段，各部门的变体指定措辞和语气。Guardrails 在调用时统一检查仇恨内容、拒绝主题与敏感信息。涉及个人健康数据时还要配置合适的敏感实体或匹配规则，单靠禁词表容易漏检。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 9,
    "votes": {
      "A": 100
    },
    "questionPage": 3
  },
  {
    "id": 6,
    "stem": "一家金融服务公司正在构建一个客户支持应用程序，该应用程序可根据与用户查询的语义相似性从数据库中检索相关金融监管文档。该应用程序必须与Amazon Bedrock 集成以生成响应，并且能够搜索英文、西班牙文和葡萄牙文的文档，还必须按发布日期、监管机构和文档类型等元数据筛选文档。\n该数据库存储了大约1000 万个文档嵌入向量。为了最大限度降低运营开销，该公司需要一个尽可能减少管理和维护工作的解决方案，同时应用程序必须为实时客户交互提供低延迟响应。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "使用Amazon OpenSearch Serverless 提供向量搜索功能和元数据筛选。连接到Amazon Bedrock Knowledge Bases 以启用使用Anthropic Claude 基础模型（FM）的检索增强生成（RAG）功能。",
      "B": "部署一个带pgvector 扩展的Amazon Aurora PostgreSQL 数据库。定义表来存储嵌入向量和元数据。使用SQL 查询执行相似度搜索。将检索到的文档发送到Amazon Bedrock 以生成响应。",
      "C": "使用Amazon S3 Vectors 配置向量索引和不可筛选元数据字段。将S3 Vectors 与Amazon Bedrock 集成以启用检索增强生成（RAG）功能。",
      "D": "搭建Amazon Neptune Analytics 图数据库。配置一个具有适当维度的向量索引来存储文档嵌入向量。使用Amazon Bedrock 执行基于图的检索并生成响应。"
    },
    "answer": [
      "A"
    ],
    "page": 4,
    "explanation": "OpenSearch Serverless 可让知识库在向量检索时同时按日期、监管机构和文档类型筛选，减轻集群维护工作。查询和文档应使用能覆盖三种语言的嵌入模型，否则即使向量库扩展到千万条也难以保证跨语言召回。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 10,
    "votes": {
      "A": 100
    },
    "questionPage": 3
  },
  {
    "id": 7,
    "stem": "一家医疗公司正在构建一个生成式人工智能（GenAI）应用程序，该应用使用检索增强生成（RAG）提供循证医疗信息。该应用使用Amazon OpenSearch Service检索向量嵌入。用户报告称，搜索经常遗漏包含精确医学术语和首字母缩略词的结果，并且返回太多语义相似但不相关的文档。该公司需要提高检索质量，并保持较低的最终用户延迟，即便文档集合增长到数百万份文档也应如此。\n以下哪个解决方案满足这些需求，同时带来的运营开销最低？",
    "options": {
      "A": "配置混合搜索，将向量相似度与关键词匹配相结合，以提升语义理解能力，同时改进对精确术语和首字母缩略词的匹配效果。",
      "B": "将向量嵌入的维度从384增加到1536。使用AWS Lambda后处理函数在检索完成后过滤掉不相关的结果。",
      "C": "将OpenSearch Service替换为Amazon Kendra。在预处理阶段使用查询扩展处理医学首字母缩略词和术语变体。",
      "D": "实现两阶段检索架构，由Amazon SageMaker AI托管的机器学习模型对初始向量搜索结果进行重排序。"
    },
    "answer": [
      "A"
    ],
    "page": 4,
    "explanation": "医学缩写和术语需要精确字面命中，病症的同义表述又需要语义匹配。混合搜索同时使用关键词和向量相似度，在原有 OpenSearch 索引上融合两组结果。单纯增大嵌入维度并没有引入精确词匹配。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 11,
    "votes": {
      "A": 100
    },
    "questionPage": 4
  },
  {
    "id": 8,
    "stem": "某公司在一个AWS应用账户中运行基于生成式AI（GenAI）的摘要应用，该应用使用Amazon Bedrock。应用架构包含一个Amazon API Gateway REST API，它会将请求转发给附加到私有VPC子网的AWS Lambda函数。该应用负责对公司存储在集中式数据存储账户中受控数据湖内的敏感客户记录进行摘要处理。公司已在数据存储账户中启用了Amazon S3、Amazon Athena和AWS Glue。\n公司必须确保应用对Amazon Bedrock的调用仅使用公司应用VPC与Amazon Bedrock之间的私有连接。公司数据湖必须在公司的多个AWS账户之间提供细粒度的列级访问权限。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "在应用账户中，为Amazon Bedrock运行时创建接口VPC端点。在私有子网中运行Lambda函数。在推理和数据平面策略上使用IAM条件，仅允许对已批准端点和角色进行调用。在数据存储账户中，使用基于AWS Lake Formation LF标签的访问控制来创建表级和列级的跨账户授权。",
      "B": "在私有子网中运行Lambda函数。配置NAT网关以提供对Amazon Bedrock和数据湖的访问权限。使用S3存储桶策略和ACL管理权限。将AWS CloudTrail日志导出到Amazon S3，每周进行审查。",
      "C": "仅在应用账户中为Amazon S3创建网关端点。通过公共端点调用Amazon Bedrock。在AWS Lake Formation中使用数据库级授权来管理数据访问。将AWS CloudTrail日志流式传输到Amazon CloudWatch Logs。不设置指标筛选器或警报。",
      "D": "使用VPC端点在应用账户中提供对Amazon Bedrock和Amazon S3的访问权限。仅使用基于IAM路径的策略管理数据湖访问。将AWS CloudTrail日志发送到Amazon CloudWatch Logs。定期创建控制面板，并允许跨区域读取的公共回退以缩短设置时间。"
    },
    "answer": [
      "A"
    ],
    "page": 5,
    "explanation": "Lambda 通过 Bedrock Runtime 接口型 VPC 端点调用模型，策略再限定获准的端点和角色。数据湖一侧由 Lake Formation 按标签把列权限授给指定账户。这分别解决网络路径和「哪些列可以读」两个独立问题。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 12,
    "votes": {
      "A": 100
    },
    "questionPage": 4
  },
  {
    "id": 9,
    "stem": "一家媒体公司必须使用Amazon Bedrock为AI生成内容实施强大的治理流程。该公司需要管理数百个提示词模板。多个团队在多个AWS区域使用这些模板生成内容。该解决方案必须提供带审批工作流的版本控制，审批工作流需包含待审核通知。该解决方案还必须提供详细的审计跟踪，记录提示词活动，并提供一致的提示词参数化来强制执行质量标准。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "配置Amazon Bedrock Studio提示词模板。使用Amazon CloudWatch创建显示提示词使用指标的控制面板。将内容的审批状态存储在Amazon DynamoDB中。使用AWS Lambda函数强制执行审批。",
      "B": "使用Amazon Bedrock Prompt Management实现版本控制。配置AWS CloudTrail进行审计日志记录。使用IAM策略控制审批权限。通过指定变量创建参数化提示词模板。",
      "C": "使用AWS Step Functions创建审批工作流。将提示词存储为Amazon S3中的文档。使用标签实现版本控制。使用Amazon EventBridge发送通知。",
      "D": "部署Amazon SageMaker Canvas，并使用存储在Amazon S3中的提示词模板。使用AWS CloudFormation实现版本控制。使用AWS Config强制执行审批策略。"
    },
    "answer": [
      "B"
    ],
    "page": 5,
    "explanation": "Prompt Management 让团队复用参数化模板并固定版本，CloudTrail 留下修改记录，IAM 限制可以发布的人员。实际实现待审通知和逐级批准时还需要触发通知或工作流，仅授予审批权限不会自动向审核人发消息。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 13,
    "votes": {
      "B": 100
    },
    "references": [
      {
        "title": "AWS · 创建提示词版本",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-create.html"
      }
    ],
    "questionPage": 5
  },
  {
    "id": 10,
    "stem": "一家公司正在开发一个客户支持应用程序，该应用程序使用Amazon Bedrock基础模型（FM）为公司员工提供实时AI协助。应用程序需要在响应生成过程中逐字符显示AI生成的内容。该应用程序需要支持数千名并发用户，同时保持极低延迟，响应通常需要15到45秒才能生成完成。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "配置一个带有AWS Lambda集成的Amazon API Gateway WebSocket API。配置该WebSocket API调用Amazon Bedrock的InvokeModelWithResponseStream API，并通过WebSocket连接流式传输部分响应。",
      "B": "配置一个带有AWS Lambda集成的Amazon API Gateway REST API。配置该REST API调用Amazon Bedrock标准的InvokeModel API，并实现前端客户端每100毫秒轮询一次获取完整响应块。",
      "C": "使用IAM用户凭证通过InvokeModelWithResponseStream API实现前端客户端直接连接Amazon Bedrock，不使用任何中间网关或代理层。",
      "D": "配置一个带有AWS Lambda集成的Amazon API Gateway HTTP API。配置该HTTP API将完整响应缓存在Amazon DynamoDB表中，并通过多个分页GET请求将响应提供给前端客户端。"
    },
    "answer": [
      "A"
    ],
    "page": 6,
    "explanation": "Lambda 消费 Bedrock 的流式输出，每收到一段就通过已有的 WebSocket 连接推送给客户端，前端可边收边显示。普通 InvokeModel 加轮询仍然需要等待完整回答生成，无法显示已生成的片段。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 15,
    "votes": {
      "A": 100
    },
    "questionPage": 5
  },
  {
    "id": 11,
    "stem": "某公司正在使用Amazon Bedrock设计一款应用，帮助研究人员申请资助。该应用基于Amazon Nova Pro基础模型（FM）构建，包含四个必填输入项，并且必须以一致的文本格式提供响应。公司希望在Amazon Bedrock中收到响应包含欺凌语言的通知，但不希望阻止所有被标记的响应。\n该公司创建了一个Amazon Bedrock流，接收输入提示词并将其发送给Amazon Nova Pro FM，由Amazon Nova Pro FM提供响应。\n为满足这些要求，公司还必须完成哪些额外步骤？（请选择两项。）",
    "options": {
      "A": "使用Amazon Bedrock Prompt Management将必填输入项指定为变量。选择一个Amazon Nova Pro FM。指定响应的输出格式。将提示词添加到流的提示词节点中。",
      "B": "创建一个Amazon Bedrock防护栏（guardrail），启用仇恨内容过滤器。将过滤器响应设置为阻止。将防护栏添加到流的提示词节点中。",
      "C": "创建一个Amazon Bedrock提示路由器。指定一个Amazon Nova Pro FM。将必填输入项作为变量添加到流的输入节点中。将提示路由器添加到提示词节点中。将输出格式添加到输出节点中。",
      "D": "创建一个Amazon Bedrock防护栏（guardrail），启用侮辱内容过滤器。将过滤器响应设置为检测。将防护栏添加到流的提示词节点中。",
      "E": "创建一个指定Amazon Nova Pro FM的Amazon Bedrock应用推理配置文件。在描述中指定响应的输出格式。为每个输入变量添加一个标签。将配置文件添加到提示词节点中。"
    },
    "answer": [
      "A",
      "D"
    ],
    "page": 6,
    "explanation": "四个必填值可做成提示模板变量，并在模板中指定输出格式。把侮辱内容过滤器设为检测，让工作流记录命中情况并继续返回内容。若要主动通知，还须把检测事件接入日志告警或通知流程。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 16,
    "votes": {
      "AD": 100
    },
    "questionPage": 6
  },
  {
    "id": 12,
    "stem": "一家医疗保健公司正在使用Amazon Bedrock构建检索增强生成（RAG）应用程序，帮助从业人员做出临床决策。该应用程序必须实现高精度的患者信息检索，识别生成内容中的幻觉，并降低人工审核成本。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "使用Amazon Comprehend分析和分类RAG响应，并提取医疗实体和关系。使用AWS Step Functions编排自动化评估。配置Amazon CloudWatch指标来跟踪实体识别置信度分数。当准确率低于指定阈值时，配置CloudWatch发送警报。",
      "B": "实施基于大语言模型（LLM）的自动化评估，使用针对医疗内容微调的专用模型评估所有响应。部署AWS Lambda函数实现并行化评估。将结果发布到Amazon CloudWatch指标中，跟踪相关性和事实准确性。",
      "C": "配置Amazon CloudWatch Synthetics按固定计划生成带有已知答案的测试查询，跟踪模型成功率。设置仪表板将合成测试结果与预期结果进行对比。",
      "D": "部署混合评估系统，使用自动化的LLM-as-a-judge评估初步筛选响应，并针对边缘情况进行定向人工审核。使用Amazon SageMaker Feature Store维护评估数据集。使用内置的Amazon Bedrock评估跟踪检索精度和幻觉发生率。"
    },
    "answer": [
      "D"
    ],
    "page": 7,
    "explanation": "先用评审模型批量评估检索精度和回答是否有来源支持，再让人工专门复核临界、低置信和高风险样本。这样可将人工精力集中在自动评审最容易出错的部分。跟踪评估结果也需要有已标注的参考病例或证据片段。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 17,
    "votes": {
      "D": 100
    },
    "references": [
      {
        "title": "AWS · 使用评审模型运行评估",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
      }
    ],
    "questionPage": 6
  },
  {
    "id": 13,
    "stem": "某公司在AWS Control Tower中配置了登陆区。该公司处理必须留存于欧盟境内的敏感数据，因此只能使用eu-central-1区域。公司通过SCP强制执行数据驻留策略。公司的GenAI开发人员被分配了对Amazon Bedrock拥有全部权限的IAM角色。\n公司要求确保GenAI开发人员仅能通过跨区域推理（CRI）、仅在eu-central-1区域通过Amazon Bedrock使用Amazon Nova Pro模型。公司已经为GenAI开发人员的IAM角色在Amazon Bedrock中启用了模型访问权限。但是当GenAI开发人员尝试通过Amazon Bedrock聊天/文本终端节点调用模型时，开发人员收到了以下错误。\n用户: arn:aws:sts::123456789012:assumed-role/AssumedDevRole/DevUserName\n操作: bedrock:InvokeModelWithResponseStream\n资源: arn:aws:bedrock:eu-west-3::foundation-model/amazon.nova-pro-v1:0\n上下文: 服务控制策略明确拒绝了该操作\n公司需要一个解决方案来解决此错误，该解决方案必须保留公司现有的治理控制，提供精确的访问控制，并且符合公司现有的数据驻留策略。\n以下哪组解决方案组合能够满足这些要求？（请选择两项）",
    "options": {
      "A": "向GenAI开发人员的IAM角色添加AdministratorAccess策略。",
      "B": "扩展现有SCP，为eu.amazon.nova-pro-v1:0推理配置文件启用CRI。",
      "C": "在eu-west-3区域为Amazon Nova Pro启用Amazon Bedrock模型访问权限。",
      "D": "验证GenAI开发人员的IAM角色拥有权限，能够通过eu.amazon.nova-pro.v1:0推理配置文件在所有可为该模型提供服务的欧盟AWS区域调用Amazon Nova Pro。",
      "E": "扩展现有SCP，为eu.*推理配置文件启用CRI。"
    },
    "answer": [
      "B",
      "D"
    ],
    "page": 7,
    "explanation": "报错中的 eu-west-3 是推理配置文件可能路由到的目标区域。跨区域模型既需要 SCP 放行配置文件的所有目标区域，也需要开发者角色拥有相应调用权限。若约束严格要求数据只能停留在 eu-central-1，题库的 B、D 无法同时保证这项要求与跨区域推理。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 18,
    "votes": {
      "BD": 75,
      "B": 25
    },
    "references": [
      {
        "title": "AWS · 跨区域推理配置文件与目标区域",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html"
      }
    ],
    "questionPage": 7
  },
  {
    "id": 14,
    "stem": "一家金融服务公司正在使用Amazon Bedrock开发客户服务AI助理。该AI助理不得与用户讨论投资建议，必须拦截有害内容、遮盖个人身份信息（PII），并保留审计轨迹以满足合规报告要求。AI助理必须根据内容敏感度对用户输入和模型响应都应用内容过滤。\n该公司要求配置一个Amazon Bedrock防护护栏，能够以最少的误报有效执行策略，并且该解决方案必须对多种类型的敏感内容提供多种处理策略。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "配置单个防护护栏，并将所有类别的内容过滤器设置为高敏感度。为投资建议配置拒绝主题，并添加要拦截的示例短语。配置敏感信息过滤器，对所有PII实体执行拦截操作。将该防护护栏应用于所有模型推理调用。",
      "B": "使用分层策略配置多个防护护栏。创建一个防护护栏，将内容过滤器设置为高敏感度。配置该防护护栏，为公开交互拦截PII。配置第二个防护护栏，将内容过滤器设置为中敏感度。配置该防护护栏，为内部使用遮盖PII。配置多个特定主题的防护护栏来拦截投资建议，并设置上下文接地检查。",
      "C": "配置一个防护护栏，将有害内容的内容过滤器设置为中敏感度。为投资建议配置拒绝主题，并添加需要拦截的明确定义和示例短语。配置敏感信息过滤器，在响应中遮盖PII，并在输入中拦截金融信息。启用使用自定义拦截消息的输入和输出评估，用于审计。",
      "D": "为每个用例创建单独的防护护栏。创建一个应用有害内容过滤器的防护护栏。创建一个为投资建议应用主题过滤器的防护护栏。创建一个应用敏感信息过滤器来拦截PII的防护护栏。使用AWS Step Functions按顺序串联这些防护护栏，基于内容分类使用条件逻辑。"
    },
    "answer": [
      "C"
    ],
    "page": 8,
    "explanation": "有害内容、投资建议和个人身份信息需要不同处理。内容过滤器负责有害类别，拒绝主题表达业务禁令，敏感信息策略按输入或输出选择拦截或遮盖。自定义拦截提示只能告诉用户请求被拦截，审计还应记录相关干预事件。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 19,
    "votes": {
      "C": 100
    },
    "questionPage": 7
  },
  {
    "id": 15,
    "stem": "一家电商公司正在开发生成式AI（GenAI）解决方案，该方案使用Anthropic Claude的Amazon Bedrock向客户推荐产品。客户反馈部分推荐产品在网站上无法购买，或者与客户需求不相关。客户还反映该解决方案生成部分推荐的耗时很长。\n该公司调查问题后发现，客户与产品推荐解决方案之间的大多数交互都是唯一的。公司确认该解决方案推荐的产品并不在公司的产品目录中。该公司必须解决这些问题。\n哪个方案可以满足要求？",
    "options": {
      "A": "在Amazon Bedrock Guardrails中增强接地能力。启用Automated Reasoning检查。配置预置吞吐量。",
      "B": "使用提示工程将模型响应限制在相关产品范围内。使用InvokeModelWithResponseStream操作这类流式技术降低客户感知到的延迟。",
      "C": "创建一个Amazon Bedrock知识库。实现检索增强生成（RAG）。将PerformanceConfigLatency参数设置为optimized。",
      "D": "将产品目录数据存储在Amazon OpenSearch Service中。对照产品目录验证模型的产品推荐结果。使用Amazon DynamoDB实现响应缓存。"
    },
    "answer": [
      "C"
    ],
    "page": 8,
    "explanation": "把最新商品目录作为知识库检索源，让模型从实际在售的相关商品中推荐。高频请求大多不同，共享答案缓存的命中机会较少。支持该模式的模型可启用延迟优化推理，再通过实际请求测量效果。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 20,
    "votes": {
      "C": 100
    },
    "questionPage": 8
  },
  {
    "id": 16,
    "stem": "某公司正在使用AWS Lambda和REST API构建推理智能体，以自动化支持工作流。该系统必须在交互过程中保留记忆、共享相关智能体状态，并支持事件驱动调用和同步调用。该系统还必须实施访问控制和基于会话的权限。\n以下哪种步骤组合可提供可扩展性最高的解决方案？（请选择两项）",
    "options": {
      "A": "使用Amazon Bedrock AgentCore管理记忆和感知会话的推理。借助内置身份支持、事件处理和可观测性部署智能体。",
      "B": "使用Amazon API Gateway和Amazon EventBridge将Lambda函数和REST API注册为操作。启用Amazon Bedrock AgentCore调用Lambda函数和REST API，无需自定义编排代码。",
      "C": "使用Amazon Bedrock Agents进行推理和会话管理。使用AWS Step Functions和Amazon SQS队列进行编排。将智能体状态存储在Amazon DynamoDB中，以在步骤之间保留记忆。",
      "D": "将推理逻辑作为容器部署在Amazon ECS上，放置在Amazon API Gateway后方。使用Amazon Aurora存储记忆数据和身份数据。",
      "E": "使用Amazon Kendra和Amazon Bedrock构建自定义RAG流水线。使用AWS Lambda编排工具调用。将智能体状态存储在Amazon S3中。"
    },
    "answer": [
      "A",
      "B"
    ],
    "page": 9,
    "explanation": "AgentCore 的记忆和身份能力让交互共享必要状态，并按会话控制权限。同步工具请求可经 API Gateway，异步事件可经 EventBridge 触发。要让智能体发现和调用这些工具，还要在工具网关或运行时注册对应目标并授权。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 21,
    "votes": {
      "AB": 71,
      "A": 29
    },
    "questionPage": 8
  },
  {
    "id": 17,
    "stem": "一家金融服务公司正在开发检索增强生成（RAG）应用，帮助投资分析师查询跨多种投资工具、市场板块和监管环境的复杂金融关系。数据集包含高度互联、存在多跳关系的实体。分析师必须能够全面检查这些关系，才能提供准确的投资指导。应用必须提供能够捕捉金融实体之间间接关系的全面回答，且必须在3秒内生成响应。\n哪个解决方案能够满足这些需求，同时带来最少的运营开销？",
    "options": {
      "A": "使用支持Graph RAG的Amazon Bedrock知识库和Amazon Neptune Analytics存储金融数据，分析实体之间的多跳关系，并自动识别跨文档的关联信息。",
      "B": "使用Amazon Bedrock知识库和Amazon OpenSearch Service向量存储，实现自定义关系识别逻辑，该逻辑使用AWS Lambda函数依次查询多个向量嵌入。",
      "C": "使用支持k近邻（k-NN）搜索的Amazon OpenSearch Serverless向量数据库，在运行于Amazon EC2 Auto Scaling组的应用层实现手动关系映射。",
      "D": "使用Amazon DynamoDB在自定义索引系统中存储金融数据，使用AWS Lambda函数根据输入查询查询相关记录，使用Amazon SageMaker AI生成响应。"
    },
    "answer": [
      "A"
    ],
    "page": 9,
    "explanation": "金融实体常通过多跳关系关联，例如某项投资间接持有另一家公司的资产。GraphRAG 利用 Neptune Analytics 查找关系路径，再把相连事实交给模型组织回答。三秒的端到端目标仍须按实际图规模、查询与模型实测。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 22,
    "votes": {
      "A": 100
    },
    "questionPage": 9
  },
  {
    "id": 18,
    "stem": "一家医疗公司使用Amazon Bedrock部署了一个生成临床文档摘要的应用程序。该应用程序存在响应质量不稳定的问题，偶尔会出现事实性幻觉。该应用的月度成本超出公司预算40%。一名GenAI开发人员必须实施一个近实时监控解决方案，以检测幻觉、识别异常令牌消耗，并针对成本异常提供早期预警。该解决方案必须要求最少的自定义开发工作和维护开销。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "配置Amazon CloudWatch警报监控InputTokenCount和OutputTokenCount指标以检测异常。将模型调用日志存储在Amazon S3存储桶中。使用AWS Glue和Amazon Athena识别潜在幻觉。",
      "B": "运行Amazon Bedrock评估作业，使用基于LLM的判断来检测幻觉。配置Amazon CloudWatch跟踪令牌使用量。创建一个AWS Lambda函数处理CloudWatch指标。配置Lambda函数发送使用模式通知。",
      "C": "配置Amazon Bedrock将模型调用日志存储在Amazon S3存储桶中。启用文本输出日志。配置Amazon Bedrock防护栏执行上下文接地检查以检测幻觉。针对令牌使用指标创建Amazon CloudWatch异常检测警报。",
      "D": "使用AWS CloudTrail记录所有Amazon Bedrock API调用。在Amazon QuickSight中创建自定义仪表板以可视化令牌使用模式。使用Amazon SageMaker Model Monitor检测生成摘要中的质量漂移。"
    },
    "answer": [
      "C"
    ],
    "page": 10,
    "explanation": "对摘要及其原始文档运行上下文依据检查，能识别缺乏原文支持的输出。调用日志用于事后检查，CloudWatch 的令牌指标用于尽早识别异常消耗。费用告警和实时用量的更新时间应分别考虑。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 23,
    "votes": {
      "C": 89,
      "B": 11
    },
    "references": [
      {
        "title": "AWS · 模型调用日志与多模态数据",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
      }
    ],
    "questionPage": 9
  },
  {
    "id": 19,
    "stem": "某公司正在构建生成式AI（GenAI）应用，该应用可基于各种内部和外部数据源生成内容。公司希望确保生成的输出可完全追溯。该应用必须支持数据源注册，并支持元数据标记，以便将内容归属到其原始来源。该应用还必须在整个流水线中保留数据访问和使用的审计日志。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "使用AWS Lake Formation编目数据源并控制访问。直接在Amazon S3中应用元数据标签。使用AWS CloudTrail监控API活动。",
      "B": "使用AWS Glue Data Catalog注册和标记数据源。使用Amazon CloudWatch Logs监控访问模式和应用行为。",
      "C": "将数据存储在Amazon S3中，并使用对象标签进行来源归属。使用AWS Glue Data Catalog管理模式信息。使用AWS CloudTrail记录对S3存储桶的访问。",
      "D": "使用AWS Glue Data Catalog注册所有数据源。应用元数据标签来归属数据源。使用AWS CloudTrail记录跨服务的访问和活动。"
    },
    "answer": [
      "D"
    ],
    "page": 10,
    "explanation": "Glue Data Catalog 统一登记数据源，用稳定的来源标识和元数据把处理结果关联回原始数据。CloudTrail 记录相关服务调用。需要对象级读取记录时要启用相应数据事件。生成结果也要保留来源标识才能追到具体输入。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 24,
    "votes": {
      "D": 86,
      "C": 14
    },
    "questionPage": 9
  },
  {
    "id": 20,
    "stem": "某金融服务公司需要构建一个文档分析系统，使用Amazon Bedrock处理季度报告。该系统必须分析财务数据、执行情感分析，并验证多批次报告的合规性。每个批次包含5份报告，每份报告需要多次调用基础模型（FM）。解决方案必须在10秒内完成每个批次的分析。当前的顺序处理每个批次需要45秒。\n以下哪个解决方案能够满足这些要求？",
    "options": {
      "A": "使用配置了预置并发的AWS Lambda函数顺序处理每种分析类型。将Lambda函数超时配置为10秒。配置带指数退避的自动重试。",
      "B": "使用带Parallel状态的AWS Step Functions同时为每种分析类型调用独立的AWS Lambda函数。配置Amazon Bedrock客户端超时。使用Amazon CloudWatch指标跟踪执行时间和模型推理延迟。",
      "C": "创建一个Amazon SQS队列来缓冲分析请求。部署多个配置了预留并发的AWS Lambda函数。配置每个Lambda函数顺序处理每份报告的不同方面，然后合并结果。",
      "D": "部署一个Amazon ECS集群，运行容器顺序处理每份报告。使用负载均衡器分发批次工作负载。根据CPU利用率配置自动扩缩策略，处理需求波动。"
    },
    "answer": [
      "B"
    ],
    "page": 11,
    "explanation": "财务分析、情感分析和合规检查之间没有数据依赖时，可在 Step Functions Parallel 的独立分支上同时运行。总耗时由最慢分支和编排开销决定。设置客户端超时只能界定等待时间，十秒目标还要用各分支延迟实测。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 25,
    "votes": {
      "B": 80,
      "A": 10,
      "C": 10
    },
    "questionPage": 10
  },
  {
    "id": 21,
    "stem": "某公司正在使用Amazon Bedrock构建面向客户的AI助手，用于处理敏感的客户咨询。该公司必须采用深度防御安全控制来阻止复杂的提示注入攻击，必须保留所有安全干预的审计日志，且该AI助手必须具备跨区域容灾能力。\n以下哪种解决方案能够满足这些要求？",
    "options": {
      "A": "配置Amazon Bedrock护栏使用内容过滤器防范提示注入攻击，将内容过滤器设置为高风险等级。使用护栏配置文件实现跨区域护栏推理。结合Amazon CloudWatch Logs与自定义指标来捕获详细的护栏干预事件。",
      "B": "配置Amazon Bedrock护栏使用内容过滤器防范提示注入攻击，将内容过滤器设置为高风险等级。使用AWS WAF阻止可疑输入。使用AWS CloudTrail记录API调用以供审计。",
      "C": "部署Amazon Comprehend自定义分类来检测提示注入攻击。使用Amazon API Gateway验证请求。结合Amazon CloudWatch Logs与自定义指标来捕获详细的干预事件。",
      "D": "配置Amazon Bedrock护栏使用自定义内容过滤器防范有害内容，将内容过滤器设置为高风险等级。使用词语过滤器防范已知攻击模式。配置跨区域护栏复用以提供容灾能力。将日志存储在AWS CloudTrail中以满足合规审计要求。"
    },
    "answer": [
      "A"
    ],
    "page": 11,
    "explanation": "提示攻击过滤器检查输入中试图改变助手行为的指令，应用将护栏干预详情记入日志并按指标告警。护栏配置文件可使用多个获准区域的处理能力。完整应用的跨区域容灾还要覆盖模型、入口和数据等依赖。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 27,
    "votes": {
      "A": 80,
      "D": 7,
      "B": 7,
      "其他（原文标记不清）": 7
    },
    "questionPage": 10
  },
  {
    "id": 22,
    "stem": "某公司正在为支付处理API设计金丝雀部署策略。该系统必须支持根据实时推理指标、历史流量模式和服务运行状况，在多个Amazon Bedrock模型之间自动逐步转移流量。该解决方案必须能够逐步增加流向新模型版本的流量。如果指标保持健康，则系统增加流量；如果性能下降到可接受阈值以下，则系统减少流量。\n该公司需要在部署阶段全面监控推理延迟和错误率，并且必须能够在无需人工干预的情况下停止部署并回滚到之前的模型版本。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "使用配置了预置吞吐量的Amazon Bedrock托管各版本模型。配置Amazon EventBridge规则，在发布新模型版本时触发AWS Step Functions工作流。配置工作流分阶段转移流量，等待指定时间段后，调用AWS Lambda函数检查Amazon CloudWatch性能指标。配置工作流在指标满足阈值时增加流量，在性能指标低于阈值时触发流量回滚。",
      "B": "使用AWS Lambda函数调用不同版本的Amazon Bedrock模型。使用带阶段变量和加权路由的Amazon API Gateway HTTP API，将流量逐步转移到新模型版本。使用Amazon CloudWatch监控性能指标。使用外部逻辑调整模型版本之间的流量，并在性能低于阈值时回滚。",
      "C": "使用Amazon SageMaker AI端点变体表示多个Amazon Bedrock模型版本，通过变体权重转移流量。使用Amazon CloudWatch监控性能指标。如果性能下降到指定阈值以下，使用SageMaker Model Monitor触发AWS Lambda函数回滚模型部署。配置Amazon EventBridge规则，在检测到异常时回滚模型部署。",
      "D": "使用Amazon OpenSearch Service跟踪推理日志。配置OpenSearch Service调用AWS Systems Manager Automation运行手册，根据推理日志更新Amazon Bedrock模型端点以转移流量。"
    },
    "answer": [
      "A"
    ],
    "page": 12,
    "explanation": "给新模型少量流量并保留旧模型作为回滚目标。每轮观察后由工作流检查错误率和延迟，再决定继续放量还是调回旧版本。固定时间把流量全部切过去，无法根据真实请求表现控制风险。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 29,
    "votes": {
      "A": 90,
      "C": 10
    },
    "questionPage": 11
  },
  {
    "id": 23,
    "stem": "一家金融服务公司使用AI应用程序通过Amazon Bedrock处理金融文档。在工作时间内，应用程序每小时处理大约10,000个请求，需要稳定的吞吐量。\n该公司使用CreateProvisionedModelThroughput API购买了预配置吞吐量。Amazon CloudWatch指标显示，预配置容量未被使用，同时按需请求正在被限流。该公司在应用程序中发现以下代码：\npython response = bedrock_runtime.invoke_model(modelId=\"anthropic.claude-v2\", body=json.dumps(payload))\n该公司需要应用程序使用预配置吞吐量并解决限流问题。\n哪个解决方案可以满足这些需求？",
    "options": {
      "A": "增加预配置吞吐量配置中的模型单元（MU）数量。",
      "B": "将模型ID参数替换为CreateProvisionedModelThroughput API返回的预配置模型的ARN。",
      "C": "添加指数退避重试逻辑来处理高峰时段的限流异常。",
      "D": "修改应用程序以使用InvokeModelWithResponseStream API，而不是InvokeModel API。"
    },
    "answer": [
      "B"
    ],
    "page": 12,
    "explanation": "这段代码以基础模型 ID 调用，流量继续进入按需池，所以会同时出现按需限流和预置容量空闲。把同一个 modelId 参数改为已购买的预置模型 ARN，请求才能消耗那部分容量。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 31,
    "votes": {
      "B": 91,
      "C": 9
    },
    "questionPage": 11
  },
  {
    "id": 24,
    "stem": "某公司正在使用Amazon Bedrock构建一个AI咨询应用程序，该应用程序将为客户提供建议。公司要求该应用程序能够说明其推理过程，并引用具体的数据来源。应用程序必须从公司数据源检索信息，并展示生成建议的分步推理过程，同时还必须将数据声明与源文档关联，并将响应延迟保持在3秒以内。\n以下哪个解决方案能够满足这些需求，并且运营开销最低？",
    "options": {
      "A": "使用启用了来源归因功能的Amazon Bedrock知识库。将Anthropic Claude Messages API与RAG结合使用，为源文档设置高相关性阈值。将推理过程和引用存储在Amazon S3中，以供审计。",
      "B": "将Amazon Bedrock与Anthropic Claude模型结合使用，启用深度思考功能。配置4000 token的思考预算。将推理轨迹和引用存储在Amazon DynamoDB中，以供审计。",
      "C": "使用Amazon SageMaker AI配置自定义Anthropic Claude模型。使用模型的推理参数和AWS Lambda处理响应。从单独的Amazon RDS数据库添加来源引用。",
      "D": "将Amazon Bedrock与Anthropic Claude模型结合使用，启用思维链推理。使用Amazon Bedrock知识库API配置自定义检索追踪。使用Amazon CloudWatch监控响应延迟指标。"
    },
    "answer": [
      "A"
    ],
    "page": 13,
    "explanation": "知识库检索公司材料并提供引用，应用可以逐条展示支持建议的证据与简要理由，再把引用和结果归档。原讨论指出，返回引用并不等于自动生成可核查的决策说明，也没有自然保证三秒响应。两项需要单独设计和验证。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 33,
    "votes": {
      "A": 64,
      "D": 21,
      "B": 14
    },
    "questionPage": 12
  },
  {
    "id": 25,
    "stem": "某金融服务公司通过Amazon Bedrock为其生成式AI（GenAI）应用使用多个基础模型（FM）。为了合规一项针对敏感金融数据使用生成式AI的新法规，该公司需要一个令牌管理解决方案。\n该令牌管理解决方案必须在应用接近特定模型的令牌限额时主动发出告警。该解决方案还必须每分钟处理超过5000个请求，并维护令牌使用指标，以便在各业务部门之间分摊成本。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "在AWS Lambda函数中开发特定于模型的分词器。配置Lambda函数在向Amazon Bedrock发送请求之前估算令牌使用量。配置Lambda函数向Amazon CloudWatch发布指标，并在请求接近阈值时触发告警。将详细的令牌使用情况存储在Amazon DynamoDB中，用于成本报告。",
      "B": "使用令牌配额策略实现Amazon Bedrock Guardrails。捕获被拒绝请求的指标。配置Amazon EventBridge规则，基于Amazon Bedrock Guardrails指标触发通知。使用Amazon CloudWatch控制面板可视化跨模型的令牌使用趋势。",
      "C": "为失败请求部署Amazon SQS死信队列。配置一个AWS Lambda函数来分析与令牌相关的故障。使用Amazon CloudWatch Logs Insights基于Amazon Bedrock API响应中的错误日志生成令牌使用模式报告。",
      "D": "使用Amazon API Gateway为所有Amazon Bedrock API调用创建代理。基于预定义令牌配额的自定义使用计划配置请求限流。配置API Gateway拒绝会超出令牌限额的请求。"
    },
    "answer": [
      "A"
    ],
    "page": 13,
    "explanation": "在发起推理前按目标模型估算令牌，按业务部门记录使用量，才能在配额即将用尽前发出提醒。调用完成后返回的实际用量适合核对成本。只观察事后账单会错过请求放行前的控制时机。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 35,
    "votes": {
      "A": 83,
      "D": 17
    },
    "questionPage": 12
  },
  {
    "id": 26,
    "stem": "一家零售公司正在开发客户服务应用程序，该应用程序每天必须处理10,000条关于产品、订单和保修的查询。应用程序必须能够响应对每日更新的50,000份产品文档的查询。应用程序必须与订单管理API集成，以检查订单状态并协助处理退货。应用程序必须在与客户的多轮交互全程维持对话上下文。公司必须收集应用程序响应的完整审计追踪。\n以下哪个解决方案能满足这些需求，同时运营开销最低？",
    "options": {
      "A": "为每个产品类别部署一个经过微调的Amazon Bedrock Anthropic Claude模型。创建AWS Lambda函数将每个模型连接到订单管理API。将会话历史存储在Amazon DynamoDB中。",
      "B": "创建一个自定义模型，在Amazon Bedrock上使用持续预训练来处理所有产品文档。搭建一个Amazon API Gateway REST API，使用AWS Lambda函数将模型连接到订单管理API。",
      "C": "使用带容器的Amazon SageMaker AI部署模型。使用Amazon Kendra搜索产品文档。使用AWS Step Functions编排对订单管理API的调用。",
      "D": "使用带动作组的Amazon Bedrock智能代理与订单管理API集成。将Amazon Bedrock知识库关联到该代理，通过检索增强生成（Retrieval Augmentation Generation, RAG）搜索产品文档。启用跟踪事件以捕获审计追踪。"
    },
    "answer": [
      "D"
    ],
    "page": 14,
    "explanation": "知识库检索每天更新的产品资料，动作组调用订单接口处理实时状态和退货。同一会话沿用相同的会话标识，Agent trace 可记录检索、工具调用与响应。还要将跟踪结果保存到审计记录中。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 36,
    "votes": {
      "D": 83,
      "A": 17
    },
    "questionPage": 13
  },
  {
    "id": 27,
    "stem": "一家电商公司正在使用Amazon Bedrock构建生成式AI（GenAI）应用。该应用使用AWS Step Functions编排多智能体工作流，以生成详细的产品描述。工作流包含三个顺序状态：描述生成器、技术规格验证器和品牌声音一致性检查器。每个状态都会生成中间推理轨迹和输出，并传递给下一个状态。该应用使用Amazon S3存储桶进行流程存储并存储输出。\n在测试期间，该公司发现Step Functions状态之间的输出经常超过256 KB配额，导致工作流失败。\n生成式AI开发人员需要修改应用架构，以高效处理Step Functions的256 KB配额，并保持工作流可观测性。修改后的架构必须保留现有的多智能体推理与行动（ReAct）模式。\n哪个解决方案能满足这些要求，同时带来的运营开销最少？",
    "options": {
      "A": "将中间输出存储在Amazon DynamoDB中。仅在状态之间传递引用。创建一个Map状态，在每个智能体处理步骤需要时从DynamoDB检索完整数据。",
      "B": "配置Amazon Bedrock集成，在大输出的输入参数中使用S3存储桶URI。使用ResultPath字段和ResultSelector字段在智能体步骤之间路由S3引用，同时保持顺序验证工作流。",
      "C": "在进入每个智能体状态前，使用AWS Lambda函数将输出压缩到256 KB以下。配置每个智能任务在处理前解压缩输出，并在将结果传递给下一个状态前压缩结果。",
      "D": "配置单独的Step Functions状态机处理每个智能体的计算。使用Amazon EventBridge协调状态机之间的执行流。将S3引用作为事件数据传递输出。"
    },
    "answer": [
      "B"
    ],
    "page": 14,
    "explanation": "把大型文本和中间结果写到 S3，状态之间只传对象 URI 和执行标识。后续步骤按引用读取，仍按原顺序运行。关键是在响应进入状态机前就把大结果写往 S3，单靠 ResultSelector 裁剪超限响应可能仍报错。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 37,
    "votes": {
      "B": 88,
      "A": 13
    },
    "questionPage": 13
  },
  {
    "id": 28,
    "stem": "一家公司提供服务，帮助全球用户发现新餐厅。该服务拥有5000万月活用户。公司希望在包含2000万家餐厅和2亿条评论的数据库中实现语义搜索解决方案。目前公司将数据存储在PostgreSQL数据库中。\n该解决方案必须支持复杂自然语言查询，并且95%以上的查询能在500毫秒内返回结果。它必须保证每小时更新一次的餐厅详细信息的数据新鲜度，还需要在高峰使用时段实现经济高效的扩展。\n哪个解决方案能够满足这些需求，同时开发工作量最少？",
    "options": {
      "A": "将餐厅数据迁移到Amazon OpenSearch Service。实现基于关键词的搜索规则，使用自定义分析器和相关性调优，根据菜系类型、特色、位置等属性查找餐厅。创建Amazon API Gateway HTTP API端点，将用户查询转换为结构化搜索参数。",
      "B": "将餐厅数据迁移到Amazon OpenSearch Service。使用Amazon Bedrock中的基础模型（FM）从餐厅描述、评论和菜单项生成向量嵌入。当用户提交自然语言查询时，使用同一个FM将查询转换为嵌入。执行k近邻（k-NN）搜索，找到语义相似的结果。",
      "C": "将餐厅数据保留在PostgreSQL中并实现pgvector扩展。使用Amazon Bedrock中的基础模型（FM）从餐厅数据生成向量嵌入。将向量嵌入直接存储在PostgreSQL中。创建一个AWS Lambda函数，使用同一个FM将自然语言查询转换为向量表示。配置Lambda函数在数据库内执行相似性搜索。",
      "D": "使用自定义摄入管道将餐厅数据迁移到Amazon Bedrock知识库。配置知识库自动从餐厅信息生成嵌入。使用Amazon Bedrock Retrieve API的内置向量搜索功能，直接通过自然语言输入查询知识库。"
    },
    "answer": [
      "B"
    ],
    "page": 15,
    "explanation": "用同一嵌入模型把餐厅资料与用户查询映射到同一向量空间，OpenSearch 通过近邻索引快速召回语义接近的餐厅。菜单和评论改变后需要增量更新索引，才能维持题干要求的数据新鲜度。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 38,
    "votes": {
      "B": 67,
      "D": 22,
      "A": 11
    },
    "questionPage": 14
  },
  {
    "id": 29,
    "stem": "一家医疗公司使用Amazon Bedrock为临床文档摘要系统提供支持。该系统在处理复杂临床文档时生成的摘要结果不一致。该系统在处理简单临床文档时表现良好。\n该公司需要一个能够诊断不一致问题、根据既定指标对比提示词性能，并保存提示词版本历史记录的解决方案。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "在Amazon Bedrock中使用提示词管理功能创建多个提示词变体。手动使用简单临床文档测试这些提示词。通过Amazon Bedrock控制台部署性能最高的版本。",
      "B": "在代码仓库中为提示词实现版本控制，并附带包含复杂临床文档和可量化评估指标的测试套件。使用自动化测试框架对比不同提示词版本，并记录性能模式。",
      "C": "将每个新提示词版本部署到独立的Amazon Bedrock API端点。在端点之间分配生产流量。配置Amazon CloudWatch捕获响应指标和用户反馈，实现自动版本选择。",
      "D": "在Amazon Bedrock Flows中创建自定义提示词评估流程，对不同提示词变体应用相同的临床文档输入。使用Amazon Comprehend Medical分析并对每个版本的事实准确性打分。"
    },
    "answer": [
      "B"
    ],
    "page": 15,
    "explanation": "把复杂临床文档纳入固定的回归测试集，为事实一致性、要点覆盖等定义可重复的指标。对每个版本运行相同测试并保留分数，才能把质量变化归因到一次具体提示词修改。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 40,
    "votes": {
      "B": 62,
      "D": 31,
      "A": 8
    },
    "questionPage": 14
  },
  {
    "id": 30,
    "stem": "某公司使用Amazon Bedrock为客户生成技术内容。该公司近期发现，在其模型生成长技术文档的摘要时，幻觉输出大幅增加。模型输出包含不准确或编造的细节。该公司当前的解决方案是使用大型基础模型（FM），搭配基础单样本提示，将完整文档作为单个输入。\n该公司需要一种能够减少幻觉、满足事实准确性目标的解决方案。该解决方案必须每小时处理超过1,000份文档，且每份文档的摘要输出需在3秒内完成。\n下列哪种解决方案组合能够满足这些需求？（请选择两项）",
    "options": {
      "A": "实现零样本思维链（CoT）指令，要求模型在生成每份摘要前，通过逐步推理进行明确的事实验证。",
      "B": "使用Retrieval Augmented Generation (RAG) 搭配Amazon Bedrock知识库。应用语义分块和调优嵌入，让摘要基于源内容生成。",
      "C": "配置Amazon Bedrock防护栏，拦截任何匹配幻觉内容相关模式的生成输出。",
      "D": "提高Amazon Bedrock中的温度参数。",
      "E": "提示Amazon Bedrock模型在单次处理中汇总整份完整文档。"
    },
    "answer": [
      "A",
      "B"
    ],
    "page": 16,
    "explanation": "B 让摘要依据可检索的原文片段，A 的意图是引导模型在生成前核对事实。讨论中有人指出，额外推理会增加延迟。自我核验仍可能重复同一个错误。事实准确率和三秒预算应分别测试。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 41,
    "votes": {
      "AB": 88,
      "BC": 6,
      "C": 6
    },
    "questionPage": 15
  },
  {
    "id": 31,
    "stem": "某公司拥有一个推荐系统，该系统的应用程序运行在Amazon EC2实例上。应用程序通过API调用Amazon Bedrock基础模型（FM）来分析客户行为并生成个性化产品推荐。\n该系统当前遇到间歇性问题，部分推荐不符合客户偏好。公司需要一个可观测性解决方案来监控运营指标，检测相对于既定基准的运营性能下降模式。当FM行为偏离预期模式时，该解决方案还必须在10分钟内生成附带关联数据的告警。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "为应用程序基础设施配置Amazon CloudWatch Container Insights。针对延迟阈值设置CloudWatch告警。使用CloudWatch嵌入指标格式添加令牌计数自定义指标。创建CloudWatch控制面板来可视化数据。",
      "B": "实施AWS X-Ray跟踪流经应用程序组件的请求。启用CloudWatch Logs Insights进行错误模式检测。设置AWS CloudTrail监控所有发往Amazon Bedrock的API调用。在Amazon QuickSight中创建自定义控制面板。",
      "C": "为应用程序资源启用Amazon CloudWatch Application Insights。结合针对请求类型和用户细分的维度，使用CloudWatch嵌入指标格式创建推荐质量、令牌使用量和响应延迟的自定义指标。针对模型指标配置CloudWatch异常检测。使用CloudWatch Logs Insights建立日志模式分析。",
      "D": "使用带可观测性插件的Amazon OpenSearch Service。通过Amazon Kinesis采集模型指标和日志。创建自定义Piped Processing Language（PPL）查询来分析模型行为模式。建立运营控制面板实时可视化异常。"
    },
    "answer": [
      "C"
    ],
    "page": 16,
    "explanation": "用 CloudWatch 嵌入指标格式记录业务侧可测的推荐质量，以及相同请求的令牌数和延迟。按请求类型或客群建立基线，并用异常检测告警关联日志。没有相关业务指标时，基础设施运行良好也可能掩盖推荐质量下滑。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 43,
    "votes": {
      "C": 88,
      "B": 13
    },
    "questionPage": 15
  },
  {
    "id": 32,
    "stem": "某企业应用使用Amazon Bedrock基础模型（FM）处理和分析50至200页的技术文档。当处理超出FM上下文窗口限制的文档时，用户遇到响应不一致和输出被截断的问题。\n以下哪个解决方案可以解决该问题？",
    "options": {
      "A": "将每个分块配置为4000个令牌的固定大小分块，并设置20%的重叠。在进行推理调用前，使用应用层逻辑按顺序链接多个分块，直到达到FM最大上下文窗口200000个令牌。",
      "B": "使用分层分块，父分块为8000个令牌，子分块为2000个令牌。使用Amazon Bedrock知识库的内置检索功能，根据查询上下文自动选择相关的父分块。配置重叠令牌以保持语义连续性。",
      "C": "使用语义分块，断点百分位数阈值为95%，缓冲区大小为3个句子。调用Amazon Bedrock RetrieveAndGenerate API，根据嵌入相似度动态选择最相关的分块。",
      "D": "创建一个预处理AWS Lambda函数，使用FM的分词器分析文档令牌计数。配置该Lambda函数将文档拆分为适合放入上下文窗口80%容量的等分段。配置Lambda函数在聚合结果前独立处理每个分段。"
    },
    "answer": [
      "C"
    ],
    "page": 17,
    "explanation": "题库选 C，思路是按语义切分超长文档，只把相关片段送进模型。注意 Bedrock 的 bufferSize 参数只接受 0 或 1。若题面的「3 个句子」指当前句加前后各一句，这对应 bufferSize=1。直接传入 3 会校验失败。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 44,
    "votes": {
      "C": 67,
      "B": 25,
      "D": 8
    },
    "references": [
      {
        "title": "AWS · 语义分块的参数范围",
        "url": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent_SemanticChunkingConfiguration.html"
      }
    ],
    "questionPage": 16
  },
  {
    "id": 33,
    "stem": "某公司正在开发生成式AI（GenAI）应用，该应用可实时分析客户服务通话，并为人工客服生成建议回复。该应用在高峰时段必须处理50万路并发通话，且每条建议的端到端延迟低于200毫秒。该公司使用现有架构对客户通话音频流进行转录。应用不得超过预先设定的月度计算预算，且必须保留自动扩展能力。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "在Amazon Bedrock上部署大型复杂推理模型。购买预置吞吐量，并针对批处理进行优化。",
      "B": "在Amazon Bedrock上部署低延迟、实时优化的模型。购买预置吞吐量，并配置自动扩展策略。",
      "C": "在Amazon SageMaker AI实时端点上部署大语言模型（LLM），该端点使用专用GPU实例。",
      "D": "在Amazon SageMaker AI无服务器端点上部署中型语言模型，该端点针对批处理进行优化。"
    },
    "answer": [
      "B"
    ],
    "page": 17,
    "explanation": "题库选 B，依据是低延迟模型和预留容量有助于高峰期间的稳定性。讨论质疑选项中笼统的自动扩展说法，Bedrock 按模型单位购买的预置吞吐量不能用普通端点伸缩策略直接改单位数。50 万并发和 200 毫秒仍需容量估算与压测。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 46,
    "votes": {
      "B": 75,
      "C": 25
    },
    "references": [
      {
        "title": "AWS · 修改预置吞吐量",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prov-thru-edit.html"
      }
    ],
    "questionPage": 16
  },
  {
    "id": 34,
    "stem": "一家电子商务公司正在构建一个内部平台，用于使用Amazon Bedrock基础模型（FM）开发生成式AI应用程序。开发人员需要根据与电子商务用例一致的评估来选择模型。该平台必须在仪表盘中显示文本生成和摘要任务的准确率指标。该公司拥有自定义电子商务数据集，可以用作标准化评估输入。\n以下哪组步骤组合能够以最少的运营开销满足这些需求？（选两项）",
    "options": {
      "A": "将数据集导入到Amazon S3存储桶。配置适当的IAM权限和跨源资源共享（CORS）权限，使评估作业能够访问数据集。",
      "B": "将数据集导入到Amazon S3存储桶。配置适当的IAM权限和VPC端点配置，使评估作业能够访问数据集。",
      "C": "在Amazon Bedrock控制台中配置一个AWS Lambda函数，按计划创建模型评估作业。将包含数据集的S3存储桶的URI作为输入提供。配置评估作业，测量文本生成的真实世界知识（RWK）分数和摘要任务的BERT Score。配置第二个Lambda函数检查作业状态，并将自定义日志发布到Amazon CloudWatch。创建一个自定义的Amazon CloudWatch Logs Insights仪表盘。",
      "D": "按计划使用Amazon SageMaker Clarify创建模型评估作业。使用开源框架创建并运行标准化评估。将结果发布到Amazon CloudWatch命名空间。使用词错误率分数作为文本生成的准确率指标，使用毒性分数作为摘要任务的准确率指标。配置一个AWS Lambda函数检查作业状态，并将自定义日志发布到CloudWatch。创建一个自定义的CloudWatch Logs Insights仪表盘。",
      "E": "使用fmevals或ragas框架按计划运行Amazon SageMaker AI笔记本作业，对S3存储桶中的数据集运行评估。在笔记本中编写Python代码，直接对FM调用InvokeModel API，并处理响应以进行评估。将作业状态和结果发布到Amazon CloudWatch Logs，测量文本生成的真实世界知识（RWK）分数和摘要任务的毒性分数作为准确率指标。创建一个自定义的CloudWatch Logs Insights仪表盘。"
    },
    "answer": [
      "A",
      "C"
    ],
    "page": 18,
    "explanation": "把统一的电商评估样本放入 S3，授权评估服务读取。定期用同一数据集运行评估，按任务收集生成知识准确度和摘要相似度，再发布到仪表板。CORS 涉及浏览器跨域访问，服务角色仍须获得实际的 S3 权限。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 47,
    "votes": {
      "AC": 75,
      "BC": 19,
      "C": 6
    },
    "questionPage": 17
  },
  {
    "id": 35,
    "stem": "某电梯服务公司使用Amazon Bedrock开发了一款AI助手应用。该应用会生成电梯维护建议，为公司的电梯技术人员提供支持。公司使用Amazon Kinesis Data Streams收集电梯传感器数据。\n新监管规则要求人工技术人员必须审核所有AI生成的建议。公司需要建立人工监督工作流来审核和批准AI建议，并且必须存储所有人工技术人员的审核决策，以满足审计要求。\n哪个方案可以满足这些需求？",
    "options": {
      "A": "使用AWS Lambda函数和Amazon SQS队列创建自定义批准工作流，用于人工审核AI建议。将所有审核决策存储在Amazon DynamoDB中，以满足审计要求。",
      "B": "创建包含人工批准步骤的AWS Step Functions工作流，该步骤使用waitForTaskToken API暂停执行。人工技术人员完成审核后，使用AWS Lambda函数调用包含批准决策的SendTaskSuccess API。将所有审核决策存储在Amazon DynamoDB中。",
      "C": "创建包含人工批准步骤的AWS Glue工作流。人工技术人员完成审核后，将应用与调用SendTaskSuccess API的AWS Lambda函数集成。将所有人工技术人员的审核决策存储在Amazon DynamoDB中。",
      "D": "使用自定义事件模式配置Amazon EventBridge规则，将AI建议路由给人工技术人员审核。创建AWS Glue作业处理人工技术人员批准队列。使用Amazon ElastiCache缓存所有人工技术人员的审核决策。"
    },
    "answer": [
      "B"
    ],
    "page": 19,
    "explanation": "Step Functions Standard 可发出带任务令牌的审核请求并等待。审核人提交后，回调将同一工作流恢复到正确步骤，同时把审批人、决定和时间写入 DynamoDB。一直运行 Lambda 等人回复会浪费资源并受超时限制。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 49,
    "votes": {
      "B": 88,
      "A": 13
    },
    "questionPage": 17
  },
  {
    "id": 36,
    "stem": "某银行正在构建一个生成式AI（GenAI）应用程序，该应用使用Amazon Bedrock通过扫描的财务文档评估贷款申请。应用程序必须从文档中提取结构化数据，必须在推理前编辑隐藏个人身份信息（PII），必须使用基础模型（FM）生成审批结果，必须将置信度低的文档提取结果路由到与贷款申请人位于同一AWS区域的人工审核人员。\n该公司必须确保应用程序符合严格的区域数据驻留和可审计性要求。应用程序必须能够扩展，以处理每天25,000份申请，并提供99.9%的可用性。\n以下哪种解决方案组合能够满足这些要求？（选择三项）",
    "options": {
      "A": "在同一区域内部署Amazon Textract和Amazon Augmented AI（Amazon A2I），从扫描文档中提取相关数据。将置信度低的页面路由给人工审核人员。",
      "B": "使用AWS Lambda函数在推理前检测并隐藏提交文档中的PII。应用Amazon Bedrock防护栏防止模型输出中出现不当或未授权内容。配置特定区域的IAM角色，强制执行数据驻留要求并控制对提取数据的访问。",
      "C": "在推理前使用Amazon Kendra和Amazon OpenSearch Service从上传文档中语义提取字段级值。",
      "D": "将上传的文档存储在Amazon S3中并添加对象元数据。配置IAM策略，将原始文档存储在与每个申请人相同的区域。启用对象标记以用于未来审计。",
      "E": "使用AWS Glue Data Quality验证结构化文档数据。使用AWS Step Functions编排审查工作流，其中包含一个提示工程步骤，可将验证后的数据转换为优化提示，再调用Amazon Bedrock评估贷款申请。",
      "F": "使用Amazon SageMaker Clarify，根据Amazon Bedrock做出的模型评分决策生成公平性和偏差报告。"
    },
    "answer": [
      "A",
      "B",
      "D"
    ],
    "page": 20,
    "explanation": "原题库标 ABD。A 为低置信提取提供人工审核，B 在推理前脱敏，D 把原始对象按区域存放并关联审计信息。社区最多人选 ABE（50%），ABD 得 13%。争议在 E 对模型审批编排的覆盖与 D 对驻留的覆盖。三个标答没有完整描述生成审批结果的链路。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 50,
    "votes": {
      "ABE": 50,
      "ADE": 25,
      "ABD": 13,
      "B": 13
    },
    "questionPage": 18
  },
  {
    "id": 37,
    "stem": "一家软件公司正在使用Amazon Q Business构建AI助手，允许员工通过自然语言提示访问公司信息和个人信息。该公司将这些信息存储在Amazon S3存储桶中。\n公司内每个部门在S3存储桶中都有专属前缀。每个对象名称都包含其所属部门的S3前缀。每个部门只能属于AWS IAM Identity Center中的一个组。每位员工只属于一个部门。\n该公司将Amazon Q Business配置为访问存储在S3存储桶中的数据作为数据源。公司需要确保AI助手能够根据用户的IAM Identity Center组成员身份遵循访问控制规则。\n哪个解决方案能够满足此需求，同时运营开销最低？",
    "options": {
      "A": "在每个部门文件夹中创建一个名为acl.json的JSON文件。在每个文件中创建访问控制条目，指定应当有权访问该部门数据的IAM Identity Center组。在数据源设置的访问控制部分指明该JSON文件的位置。",
      "B": "在S3存储桶的顶层创建一个名为acl.json的JSON文件。添加访问控制条目，将每个部门的S3前缀映射到对应的IAM Identity Center组。在数据源设置的访问控制部分指明该JSON文件的位置。",
      "C": "为每个IAM Identity Center组创建单独的权限集，拒绝对S3存储桶中所有前缀的访问。为每个权限集添加一个StringNotEquals条件键，指定每个组关联的部门。将权限集绑定到Identity Center组。",
      "D": "在S3存储桶的顶层创建一个名为metadata.json的元数据文件。在文件中添加一个AccessControlList对象，指定每个部门前缀的S3路径。指定应当有权访问每个部门前缀的IAM Identity Center组。在数据源元数据设置中引用该文件的位置。"
    },
    "answer": [
      "B"
    ],
    "page": 21,
    "explanation": "把部门的 S3 前缀和 Identity Center 组写入 Q Business 数据源使用的 ACL 映射。检索时用登录用户的组过滤可见文档，数据摄取可持续沿用这份集中规则。仅分文件夹而未同步权限，无法实现用户级检索隔离。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 52,
    "votes": {
      "B": 100
    },
    "questionPage": 18
  },
  {
    "id": 38,
    "stem": "一家医疗公司正在使用Amazon Bedrock构建一个帮助从业者进行临床决策的系统。该系统必须仅基于已获批的医疗文档向医生提供治疗建议，并且必须引用具体来源。该系统不得产生幻觉或输出与事实不符的信息。\n以下哪个解决方案能够满足这些要求，且运营开销最低？",
    "options": {
      "A": "将Amazon Bedrock与Amazon Kendra集成，以检索已获批文档。实现自定义后处理，将生成的回答与源文档进行比对，并添加引用。",
      "B": "部署Amazon Bedrock知识库，并将其连接到已获批的临床源文档。使用Amazon Bedrock RetrieveAndGenerate API从知识库返回引用。",
      "C": "使用Amazon Bedrock和Amazon Comprehend Medical提取医学实体。针对医学术语数据库实现验证逻辑。",
      "D": "将Amazon Bedrock知识库配合Retrieve API调用和InvokeModel API调用使用，以检索已获批的临床源文档。实现验证逻辑，与检索到的源进行比对并引用来源。"
    },
    "answer": [
      "B"
    ],
    "page": 21,
    "explanation": "知识库限定为审批通过的临床文档，RetrieveAndGenerate 返回回答及其参考片段，医生可以据此核对具体出处。RAG 能降低幻觉风险。要求「全部正确」时仍要检查证据是否支持每项结论，并处理证据不足的查询。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 53,
    "votes": {
      "B": 83,
      "C": 17
    },
    "questionPage": 19
  },
  {
    "id": 39,
    "stem": "一家金融服务公司正在开发实时生成式AI（GenAI）助手，为呼叫中心人工坐席提供支持。该GenAI助手必须能够实时转录客户语音、分析上下文，并在客户仍在发言时向呼叫中心坐席提供增量建议。为了保持响应能力，GenAI助手必须保证从语音输出到初始响应显示的端到端延迟低于1秒。架构只能使用托管AWS服务，并且必须支持双向流式传输，以确保呼叫中心坐席实时接收更新。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "使用Amazon Transcribe流式API转录通话。将文本传递给Amazon Comprehend执行情感分析。通过InvokeModel API将结果输入到Amazon Bedrock上的Anthropic Claude。将结果存储在Amazon DynamoDB中。使用WebSocket API显示结果。",
      "B": "使用启用了部分结果的Amazon Transcribe流式传输，在客户发言完成前交付已转文本片段。通过InvokeModelWithResponseStream API将文本片段转发到Amazon Bedrock。通过Amazon API Gateway WebSocket API向呼叫中心坐席流式传输响应。",
      "C": "使用Amazon Transcribe批量处理将通话转换为文本。通过ConverseStream API将完整的transcript 发送到Amazon Bedrock上的Anthropic Claude。通过呼叫中心坐席可从工作电脑访问的Amazon Lex聊天机器人界面返回响应。",
      "D": "结合Amazon Transcribe流式API和AWS Lambda函数转录每个音频片段。配置Lambda函数，通过InvokeModel API调用Amazon Bedrock上的Amazon Titan Embeddings模型。配置Lambda函数将结果发布到Amazon SNS主题。让呼叫中心坐席订阅该SNS主题。"
    },
    "answer": [
      "B"
    ],
    "page": 22,
    "explanation": "Transcribe 的中间转录让系统在说话人停顿前就能取得片段，Bedrock 将建议逐段返回，WebSocket 再推给坐席。三段都以增量方式衔接，可缩短首次可见反馈时间。部分转录可能被后续结果修订。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 54,
    "votes": {
      "B": 100
    },
    "questionPage": 19
  },
  {
    "id": 40,
    "stem": "一家媒体公司正在推出一个平台，允许每小时有数千名用户上传图片和文本内容。该平台使用Amazon Bedrock处理上传的内容，生成创意合成作品。\n该公司需要一个解决方案来确保平台不会处理或生成不当内容，并且合成作品中不得泄露个人身份信息（PII）。该解决方案必须与公司现有的Amazon S3存储工作流集成。\n哪个解决方案能够满足这些要求，同时产生的基础设施管理开销最少？",
    "options": {
      "A": "启用增强监控工具。使用Amazon CloudWatch告警筛选流向平台的流量。使用Amazon Comprehend的PII检测功能预处理数据。创建一个CloudWatch告警来监控Amazon Comprehend PII检测事件。创建一个包含Amazon Rekognition图像内容审核步骤的AWS Step Functions工作流。",
      "B": "在将上传内容存储到Amazon S3之前，使用带请求验证模板的Amazon API Gateway HTTP API筛选内容。使用Amazon SageMaker AI构建自定义内容审核模型，在将处理后的内容发送到Amazon Bedrock之前处理内容。",
      "C": "创建一个Amazon Cognito用户池，使用预认证AWS Lambda函数运行内容合规性检查。在允许用户向平台上传内容之前，使用Amazon Textract筛选文本内容，使用Amazon Rekognition筛选图像内容。",
      "D": "创建一个使用内置Amazon Bedrock防护栏筛选内容的AWS Step Functions工作流。使用Amazon Comprehend PII检测功能预处理内容。使用Amazon Rekognition进行图像内容审核。"
    },
    "answer": [
      "D"
    ],
    "page": 22,
    "explanation": "对上传的图片做 Rekognition 内容审核，对文本先检测和处理 PII，再用 Bedrock 护栏检查输入与生成内容。Step Functions 串联已有 S3 流程，并按审核结果决定能否继续生成和交付合成作品。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 55,
    "votes": {
      "D": 100
    },
    "questionPage": 20
  },
  {
    "id": 41,
    "stem": "某公司已为其所有开发人员设置了Amazon Q Developer Pro许可。该公司维护了一份开发人员在开发应用程序时必须使用的已批准资源列表。已批准资源包括内部库、专有算法技术和带有已批准样式的示例代码。\n一个新的开发团队正在使用Amazon Q Developer开发一个新的基于Java的应用程序。公司必须确保这个新的开发团队使用公司批准的资源，并且公司不希望修改项目级别配置。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "创建一个包含所有已批准的内部库、算法和代码示例的Git仓库。将此Git仓库作为工作区的一部分在本地添加到应用程序项目中。确保开发人员使用@workspace上下文从该Git仓库获取建议。",
      "B": "在项目根文件夹中，创建一个名为`.amazonq/rules` 的文件夹。将已批准的内部库、算法和代码示例添加到该文件夹中。",
      "C": "在应用程序项目中创建一个名为`rules` 的文件夹。将指南和代码存储在该文件夹中，供Amazon Q Developer参考生成产品代码建议。",
      "D": "创建一个包含已批准数据源的Amazon Q Developer定制化配置。确保开发人员在开发应用程序时使用该定制化配置。"
    },
    "answer": [
      "D"
    ],
    "page": 23,
    "explanation": "将已获准的 Java 库、内部示例和编码风格作为 Amazon Q Developer 定制的数据源，管理员把该定制提供给团队使用。这样不同项目可复用一套组织级建议。生成代码仍需经过现有代码审查才能验证实际使用的资源。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 56,
    "votes": {
      "D": 100
    },
    "questionPage": 20
  },
  {
    "id": 42,
    "stem": "一家电商公司正在使用Amazon Bedrock构建客户服务AI助手。该AI助手每天需要处理超过50,000条客户咨询。在促销活动期间，AI助手偶尔会出现流量峰值，每天咨询量最高可达150,000条。分析显示，40%的咨询遵循相似模式，共享相同上下文。\n一名GenAI开发人员必须设计一个解决方案，确保AI助手在流量峰值期间保持低延迟和稳定性能。\n哪个解决方案能够以最具成本效益的方式满足这些要求？",
    "options": {
      "A": "在向Amazon Bedrock发送请求的性能配置中，将延迟参数设置为optimized来配置延迟优化推理。使用提示缓存处理重复咨询。",
      "B": "购买配置好的吞吐量和模型单元（MU），其规格可应对峰值流量负载。使用Amazon ElastiCache（Redis OSS）缓存重复咨询。",
      "C": "使用Amazon Bedrock Agents和自定义知识库预处理客户咨询。配置跨区域推理来分发流量。",
      "D": "使用AWS Lambda函数通过自定义提示路由机制预处理请求。使用Amazon DynamoDB作为缓存层处理常见问题。"
    },
    "answer": [
      "A"
    ],
    "page": 23,
    "explanation": "若许多咨询共享相同的长上下文，提示缓存可以复用公共前缀，省去重复处理输入的开销。支持的模型还可启用延迟优化推理。措辞仅仅「语义相似」而没有共同的缓存前缀时，并不会自动命中提示缓存。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 57,
    "votes": {
      "A": 86,
      "B": 14
    },
    "questionPage": 20
  },
  {
    "id": 43,
    "stem": "一家法律研究公司拥有检索增强生成（RAG）应用程序，该应用使用Amazon Bedrock和Amazon OpenSearch Service。该应用存储了1500万份法律文档的768维向量嵌入，文档包括法规、法院裁决和案件摘要。\n该公司当前的分块策略将文本分割为500个令牌的固定长度块。当前分块策略经常将上下文关联信息（例如法律论据、法院意见或法规引用）分割到不同的分块中。研究人员反映，生成的输出经常遗漏关键上下文，或引用过时的法律信息。\n最近的应用程序日志显示响应时间增加了40%。p95延迟指标超过了2秒。该公司预计应用程序的存储需求将在一年内从90 GB增长到360 GB。\n该公司需要一个解决方案，在规模化场景下提升检索相关性和系统性能。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "将嵌入向量维度从768增加到4096，不更改现有的分块或预处理策略。",
      "B": "将动态检索替换为存储在Amazon S3中的静态预编写摘要。使用Amazon CloudFront提供摘要服务，减少计算需求并提升可预测性。",
      "C": "将分块策略更新为使用语义边界（例如完整法律论据、条款或章节），而非固定令牌限制。重新生成向量嵌入以匹配新的分块结构。",
      "D": "从OpenSearch Service迁移到Amazon DynamoDB。实现基于关键字的索引，加快法律概念的查询速度。"
    },
    "answer": [
      "C"
    ],
    "page": 24,
    "explanation": "把法条或完整论证切断后，检索很容易只取到前提而遗漏结论。改按条款和语义边界分块，并重建向量索引，使每个检索单位包含完整意思。增加向量维数无法还原切分时丢失的上下文。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 58,
    "votes": {
      "C": 100
    },
    "questionPage": 21
  },
  {
    "id": 44,
    "stem": "某公司正在开发一个基于生成式AI（GenAI）的客户支持应用，该应用使用Amazon Bedrock基础模型（FM）。应用必须在与同一用户的多次交互中维护对话上下文，必须运行澄清工作流来处理用户的模糊查询。该公司必须存储每个用户对话的加密记录，以用于个性化功能。\n应用必须能够支持数千个并发用户，同时快速响应用户请求。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "使用AWS Step Functions Express工作流编排对话流。调用AWS Lambda函数运行澄清逻辑。将对话历史存储在Amazon RDS中，使用会话ID作为主键。",
      "B": "使用AWS Step Functions Standard工作流编排澄清工作流。包含等待回调模式来管理工作流。将对话历史存储在Amazon DynamoDB中，购买按需容量并配置服务器端加密。",
      "C": "使用Amazon API Gateway REST API部署应用，将用户请求路由到AWS Lambda函数以更新和检索对话上下文。将对话历史存储在Amazon S3中并配置服务器端加密。将每个交互保存为单独的JSON文件。",
      "D": "使用AWS Lambda函数调用Amazon Bedrock推理API。使用Amazon SQS队列编排澄清步骤。将对话历史存储在Amazon ElastiCache（Redis OSS）集群中。配置静态加密。"
    },
    "answer": [
      "B"
    ],
    "page": 24,
    "explanation": "澄清问题可能要等用户下一次回复，Standard 工作流能用任务令牌等回调，再从原步骤恢复。DynamoDB 按会话保存加密历史，其他请求不必共用等待中的计算资源。讨论中支持 Express 的观点强调延迟，但 Express 不支持这种等待回调模式。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 59,
    "votes": {
      "B": 56,
      "A": 33,
      "D": 11
    },
    "questionPage": 21
  },
  {
    "id": 45,
    "stem": "一家金融服务公司需要预处理非结构化数据，例如客户访谈记录、财务报告和文档。该公司将非结构化数据存储在Amazon S3中，以支撑一个Amazon Bedrock应用。\n公司必须验证数据质量、创建可审计元数据、监控数据指标，还需要自定义文本分块以优化基础模型（FM）的性能。\n哪个解决方案能够以最少开发工作量满足这些要求？",
    "options": {
      "A": "使用Amazon SageMaker Data Wrangler创建数据流。配置Amazon CloudWatch指标和告警来监控数据质量。使用自定义AWS Lambda函数预处理数据。将处理后的数据加载到Amazon Bedrock中。",
      "B": "设置AWS Glue爬虫编目数据源。创建AWS Glue ETL作业运行自定义转换脚本。使用AWS Glue Data Quality验证和监控数据质量。将处理后的数据加载到Amazon Bedrock中。",
      "C": "使用Amazon Comprehend提取实体。创建AWS Lambda函数对文本进行分块。运行Amazon Athena查询并验证数据质量。将处理后的数据加载到Amazon Bedrock中。",
      "D": "创建AWS Step Functions工作流编排数据预处理任务。在Amazon EC2实例上运行自定义代码处理数据。使用Amazon SageMaker Model Monitor监控数据质量。将处理后的数据加载到Amazon Bedrock中。"
    },
    "answer": [
      "B"
    ],
    "page": 25,
    "explanation": "Glue 爬虫把数据源结构和位置登记到目录，ETL 作业执行定制清洗、分块，Data Quality 用规则检测缺失值或异常指标。下游知识库接收已经处理过的数据，异常也能追到具体数据源和处理批次。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 60,
    "votes": {
      "B": 100
    },
    "questionPage": 22
  },
  {
    "id": 46,
    "stem": "某公司使用Amazon Bedrock构建检索增强生成（RAG）系统。该RAG系统使用基于Amazon S3存储桶的Amazon Bedrock知识库，作为突发新闻视频内容的数据源。系统从S3存储桶中检索文字记录、归档报告和相关文档。\n该RAG系统使用最先进的嵌入模型和高性能检索配置。但用户反馈响应缓慢且结果不相关，导致用户满意度下降。该公司发现向量搜索正在评估过多跨内容类型、跨长时间范围的文档。\n该公司判定底层模型无法从额外微调中获益。公司必须通过应用更智能的约束来提高检索准确率，并且希望解决方案对现有架构的修改最少。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "使用专门针对突发新闻内容训练的领域适配模型增强嵌入，以提升向量相似度效果。",
      "B": "迁移到Amazon OpenSearch Service。使用向量字段和元数据过滤器定义结果检索的范围。",
      "C": "通过对S3对象元数据建立索引，在Amazon Bedrock知识库中启用元数据感知过滤。",
      "D": "迁移到Amazon Q Business索引，在检索过程中执行结构化元数据过滤和文档分类。"
    },
    "answer": [
      "C"
    ],
    "page": 25,
    "explanation": "当检索器在多年、多个内容类型中寻找最近某一类材料时，先按日期、类型或来源筛候选，再做向量相似度搜索，可以同时减少工作量和无关命中。索引中须包含实际可筛选的文档元数据。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 61,
    "votes": {
      "C": 88,
      "B": 13
    },
    "questionPage": 22
  },
  {
    "id": 47,
    "stem": "一家金融服务公司正在开发检索增强生成（Retrieval Augmented Generation, RAG）应用，该应用使用Amazon Bedrock生成市场活动摘要。应用依赖向量数据库来存储索引数量较少的小型专有数据集。该应用必须执行相似度搜索。Amazon Bedrock模型的响应必须最大限度提高准确性并保持高性能。\n该公司需要配置向量数据库并将其与应用集成。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "启动一个Amazon MemoryDB集群，并使用Flat算法配置索引。根据性能指标配置横向扩缩策略。",
      "B": "启动一个Amazon MemoryDB集群，并使用Hierarchical Navigable Small World (HNSW)算法配置索引。根据性能指标配置纵向扩缩策略。",
      "C": "启动一个Amazon Aurora PostgresSQL集群，并使用Inverted File with Flat Compression (IVFFlat)算法配置索引。将实例类配置为在负载增加时扩展到更大规格。",
      "D": "启动一个Amazon DocumentDB集群，该集群具有Inverted File with Flat Compression (IVFFlat)索引和高探测值。将到集群的连接配置为副本集，将读请求分发到副本实例。"
    },
    "answer": [
      "A"
    ],
    "page": 26,
    "explanation": "小型数据集可以用 FLAT 做精确近邻搜索，省去 HNSW 近似检索带来的召回取舍。标答 A 的扩容表述存在问题，AWS 文档指出 MemoryDB 向量搜索限于单分片，支持纵向扩容和添加副本，无法按分片横向扩展。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 62,
    "votes": {
      "A": 67,
      "B": 33
    },
    "references": [
      {
        "title": "AWS · MemoryDB 向量搜索的扩展限制",
        "url": "https://docs.aws.amazon.com/memorydb/latest/devguide/vector-search-limits.html"
      }
    ],
    "questionPage": 23
  },
  {
    "id": 48,
    "stem": "一名生成式AI开发人员正在构建一个基于检索增强生成（RAG）的客户支持应用程序，该应用程序使用Amazon Bedrock基础模型（FM）。应用程序需要处理存储在Amazon S3存储桶中为JSON文件格式的50 GB历史客户对话数据，必须将处理后的数据用作检索语料库。应用程序的数据处理工作流需要从客户支持文档中提取相关数据、删除客户个人可识别信息（PII），并为向量存储生成嵌入。处理工作流必须具备成本效益，并在4小时内完成。\n以下哪种解决方案满足要求，同时运营开销最少？",
    "options": {
      "A": "使用AWS Lambda和Amazon Comprehend并行处理文件，删除PII，并调用Amazon Bedrock API生成向量。配置Lambda并发限制和内存设置以优化吞吐量。",
      "B": "创建一个AWS Glue ETL作业，对数据运行PII检测脚本。使用Amazon SageMaker Processing运行HuggingFaceProcessor，通过预训练模型生成嵌入。将嵌入存储在Amazon OpenSearch Service中。",
      "C": "部署一个运行Apache Spark的Amazon EMR集群，该集群包含调用Amazon Comprehend检测PII的用户定义函数（UDF）。使用Amazon Bedrock API生成向量。将输出存储在启用了pgvector扩展的Amazon Aurora PostgreSQL中。",
      "D": "实现一个数据处理管道，使用AWS Step Functions编排工作负载，该工作负载使用Amazon Comprehend检测PII，使用Amazon Bedrock生成嵌入。将工作流直接与Amazon OpenSearch Serverless集成，以存储向量并提供相似性搜索功能。"
    },
    "answer": [
      "D"
    ],
    "page": 26,
    "explanation": "把对话分批处理，先检测并去除 PII，再生成嵌入并写入向量库，避免把敏感内容带入长期检索索引。Step Functions 适合协调并行、重试和失败记录。四小时能否完成取决于每批大小、模型配额和写入速率。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 64,
    "votes": {
      "D": 79,
      "B": 14,
      "A": 7
    },
    "questionPage": 23
  },
  {
    "id": 49,
    "stem": "一家金融服务公司正在开发一款生成式AI（GenAI）应用，同时服务高端客户和普通客户。该应用在Amazon API Gateway REST API后端使用AWS Lambda函数处理请求。公司需要根据每个用户所属的客户层级在不同AI模型之间动态切换。公司还希望无需重新部署代码即可对新功能执行A/B测试，并且需要在应用更改前验证temperature和最大token限制这类模型参数。\n以下哪个方案满足这些需求，同时运营开销最低？",
    "options": {
      "A": "为每个配置创建一个AWS Systems Manager Parameter Store参数。使用Lambda函数轮询参数更新，当配置发生变化时，使用Amazon EventBridge事件触发重新部署。",
      "B": "将模型配置存储在Amazon DynamoDB表中。优化访问模式，以便根据客户层级检索配置。配置Lambda函数，在每个请求开始时查询DynamoDB，确定要使用的模型。",
      "C": "使用AWS AppConfig管理模型配置。使用功能标记执行A/B测试。为模型参数定义JSON schema验证规则。配置Lambda函数通过AWS AppConfig Agent检索配置。",
      "D": "创建一个Amazon ElastiCache（Redis OSS）集群来存储模型配置。设置较短的TTL值。在Lambda函数中运行自定义验证逻辑。使用Amazon CloudWatch指标监控配置使用情况。"
    },
    "answer": [
      "C"
    ],
    "page": 27,
    "explanation": "AppConfig 把模型选择、实验分流和推理参数从 Lambda 代码中独立出来。发布前用 JSON Schema 校验温度和最大令牌数的取值，运行时按客户层级读取适用的配置，无须为一次参数变化重新部署函数。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 65,
    "votes": {
      "C": 100
    },
    "questionPage": 24
  },
  {
    "id": 50,
    "stem": "某公司正在使用Amazon Bedrock和Anthropic Claude 3 Haiku开发AI助手。该AI助手通常每小时处理10,000个请求，但在高峰使用时段每小时请求量会激增到30,000个。AI助手必须在2秒内响应，并且需要在多个AWS区域运行。\n该公司观察到，在高峰使用时段，AI助手出现吞吐量瓶颈，导致延迟增加，并且偶尔会出现请求超时。该公司必须解决这些性能问题。\n哪个解决方案可以满足此要求？",
    "options": {
      "A": "在单个区域购买预置吞吐量和足够的模型单元（MU）。将应用程序配置为使用指数退避重试失败请求。",
      "B": "实施令牌批处理以减少API开销。使用跨区域推理配置文件在可用区域之间自动分发流量。",
      "C": "在每个区域设置AWS Lambda函数自动扩缩容。实施客户端轮询请求分发。购买一个模型单元（MU）的预置吞吐量作为备份。",
      "D": "使用跨多个区域的Amazon S3存储桶对所有请求实施批量推理。使用Amazon SQS设置异步检索流程。"
    },
    "answer": [
      "B"
    ],
    "page": 27,
    "explanation": "高峰时把请求交给跨区域推理配置文件，让服务在允许的目标区域中寻找可用容量。合并可独立处理的工作有助于减少请求开销，但实时用户请求不能为了凑批把等待时间推过两秒。离线批量推理也不能替代这条实时路径。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 66,
    "votes": {
      "B": 100
    },
    "questionPage": 24
  },
  {
    "id": 51,
    "stem": "某公司使用Amazon Bedrock开发AI助手提供客户支持。分析显示，40%的客户查询使用不同的措辞或表述询问相同的问题。\n该公司需要一个解决方案来减少冗余模型调用，该方案必须确保语义等价的问题获得一致的答案，并且必须保证低延迟。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "部署Amazon DynamoDB Accelerator (DAX)集群作为内存缓存。将查询文本指定为分区键，将模型响应文本指定为排序键。使用带有LIKE运算符的过滤表达式查询缓存。",
      "B": "使用Amazon Bedrock从客户查询生成嵌入向量。使用Amazon MemoryDB for Valkey存储嵌入向量和模型响应的哈希集合。使用RANGE查询查找相似查询及其响应。",
      "C": "部署具备k近邻（k-NN）能力的Amazon OpenSearch Service，存储查询-响应文本对。使用近似k-NN技术查找相似查询及其响应。",
      "D": "使用Amazon DynamoDB创建缓存解决方案，在规范化查询文本上创建全局二级索引。对传入查询应用词干提取。查询缓存客户查询的索引。"
    },
    "answer": [
      "C"
    ],
    "page": 28,
    "explanation": "把历史问题的嵌入向量与原回答一起保存。新输入与历史问题的相似度足够高时复用答案，否则重新调用模型。语义缓存要保留租户、知识版本等边界，避免把看似相近但实际条件不同的答案返回给用户。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 67,
    "votes": {
      "C": 100
    },
    "questionPage": 24
  },
  {
    "id": 52,
    "stem": "某公司使用AWS Lambda函数构建AI代理解决方案。一名GenAI开发人员必须设置一台可访问用户信息的Model Context Protocol（MCP）服务器，还必须配置AI代理以使用这台新的MCP服务器。该开发人员必须确保只有已授权用户才能访问这台MCP服务器。\n哪项解决方案可以满足这些要求？",
    "options": {
      "A": "使用Lambda函数托管MCP服务器。授予AI代理Lambda函数调用托管MCP服务器的Lambda函数的权限。将AI代理的MCP客户端配置为异步调用MCP服务器。",
      "B": "使用Lambda函数托管MCP服务器。授予AI代理Lambda函数调用托管MCP服务器的Lambda函数的权限。将AI代理配置为对MCP服务器使用STDIO传输。",
      "C": "使用Lambda函数托管MCP服务器。创建一个将请求代理到Lambda函数的Amazon API Gateway HTTP API。将AI代理解决方案配置为可流式HTTP传输，以通过该HTTP API发起请求。使用Amazon Cognito实施OAuth 2.1。",
      "D": "使用Lambda层托管MCP服务器。将Lambda层添加到AI代理Lambda函数。将智能代理AI解决方案配置为使用STDIO传输向MCP服务器发送请求。在AI代理的MCP配置中，将Lambda层ARN指定为命令。将用户凭证指定为环境变量。"
    },
    "answer": [
      "C"
    ],
    "page": 28,
    "explanation": "远程 MCP 客户端通过 Streamable HTTP 调用 API Gateway 后的 Lambda，访问令牌经验证后才允许进入工具处理逻辑。授权还要约束当前用户能读取哪些数据，单纯暴露一个 HTTP 端点不能完成这项控制。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 68,
    "votes": {
      "C": 100
    },
    "questionPage": 25
  },
  {
    "id": 53,
    "stem": "某公司希望为其客户创建一个年度奖励计划。客户获得的奖励根据不同参数而变化，例如订购商品的类别和客户的购买历史。\n该公司需要一个生成式AI（GenAI）解决方案，使用三个Amazon Bedrock智能体在客户在线浏览商品目录时提供辅助。这些智能体必须使用知识库和操作组来处理搜索、推荐和订单模块。这些模块必须按顺序运行。必须由一个AWS Lambda函数计算每个推荐商品的预估奖励。该解决方案必须在服务中断时提供优雅降级。\n以下哪个解决方案能够以最高的运营效率满足这些要求？",
    "options": {
      "A": "在每个智能体后方定义一个Amazon API Gateway REST API。创建第二个Lambda函数来编排对各个智能体和奖励计算Lambda函数的调用。为第二个Lambda函数配置重试/回退机制。",
      "B": "创建一个包含四个任务的AWS Step Functions状态机，分别运行三个智能体和奖励计算Lambda函数。为每个任务步骤设置重试和捕获分支。",
      "C": "为每个智能体配置单独的重试/回退机制。创建第二个Lambda函数来编排对各个智能体和奖励计算Lambda函数的调用。在第二个Lambda函数后方定义一个Amazon API Gateway REST API。",
      "D": "创建第二个Lambda函数来编排对各个智能体和奖励计算Lambda函数的调用。创建一个AWS Step Functions状态机，其中包含一个运行第二个Lambda函数的任务。为该任务步骤设置重试和捕获分支。"
    },
    "answer": [
      "B"
    ],
    "page": 29,
    "explanation": "搜索、推荐、订单代理及奖励计算各占一个状态，前一步结果作为后一步输入。对临时错误重试，无法恢复时进入显式的 Catch 分支，例如只展示已经完成的搜索结果。服务中断无须使整条链条无提示失败。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 69,
    "votes": {
      "B": 80,
      "C": 20
    },
    "questionPage": 25
  },
  {
    "id": 54,
    "stem": "某公司正在创建一个工作流，用于在发送面向客户的沟通内容前对其进行审核。该公司使用预定义消息模板生成沟通内容，并将内容存储在Amazon S3存储桶中。该工作流需要从模板中提取特定部分，并将其发送到Amazon Bedrock模型，然后必须将模型响应存回原始S3存储桶。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "在Amazon Bedrock Flows中创建一个流。在流的开头和结尾配置S3动作节点，用于检索和存储沟通内容与模型响应。在流的中间，配置表达式来解析每份沟通内容，配置一个代理步骤将解析后的输入发送给模型进行审核。",
      "B": "创建一个AWS Step Functions Express工作流状态机。使用Amazon S3集成的GetObject步骤检索原始沟通内容。使用内在函数Pass步骤解析沟通内容，并将结果传递给Amazon Bedrock InvokeModel步骤。配置Amazon S3集成的PutObject步骤将模型响应存回S3存储桶。",
      "C": "创建一个带有动作组的Amazon Bedrock代理。配置指令来定义代理解析沟通内容的方式。配置动作组从S3存储桶检索沟通内容、调用Amazon Bedrock模型，并将模型响应存回S3存储桶。",
      "D": "创建一个带有单个动作组的Amazon Bedrock代理。在动作组中配置三个AWS Lambda函数，配置这些函数分别完成：从S3存储桶检索沟通内容、解析沟通内容并调用Amazon Bedrock模型、将模型响应存回S3存储桶。"
    },
    "answer": [
      "B"
    ],
    "page": 29,
    "explanation": "原题库选 B，社区 A、B 各 50%。B 适合固定模板，从 S3 读取，提取字段，调用模型，再写回 S3。讨论中「Flows 不支持 S3 节点」的理由不成立，AWS 已列出 S3 检索和存储节点。需根据模板能否用表达式可靠解析来比较方案。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 70,
    "votes": {
      "A": 50,
      "B": 50
    },
    "references": [
      {
        "title": "AWS · Bedrock Flows 支持的节点",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html"
      }
    ],
    "questionPage": 26
  },
  {
    "id": 55,
    "stem": "某金融科技公司正在使用Amazon Bedrock为其公司的客服AI助手构建评估系统。该AI助手提供的金融建议必须事实准确、符合金融监管要求，并且在对话场景中得体。该公司需要结合大规模自动化质量评估，以及对关键交互的定向人工审核。\n哪种方案可以满足这些要求？",
    "options": {
      "A": "配置一个流水线，由金融专家对所有回答的准确性、合规性和对话质量进行手动打分。使用Amazon SageMaker笔记本分析结果，确定需要改进的方向。",
      "B": "配置Amazon Bedrock评估，使用Anthropic Claude Sonnet作为裁判模型来评估回答的准确性和得体性。配置自定义Amazon Bedrock防护栏，检查回答是否符合金融政策要求。对标记出的关键交互添加Amazon Augmented AI (Amazon A2I)人工审核。",
      "C": "创建一个Amazon Lex机器人来管理客服交互。配置AWS Lambda函数，将回答与静态合规数据库进行比对检查。在机器人中配置调用Lambda函数检查回答的意图。添加额外意图来收集终端用户反馈。",
      "D": "配置Amazon CloudWatch监控AI助手的响应模式。配置CloudWatch警报针对潜在违规行为发出告警。组建人工评估团队审核被标记的交互。"
    },
    "answer": [
      "B"
    ],
    "page": 30,
    "explanation": "评审模型可在相同标准下批量给回答的准确性、得体性打分。与金融政策冲突或低置信度的案例再交给人工复核，保留判断理由。护栏命中和自动评分有助于筛查，合规结论仍须用已批准规则与人工复核验证。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 72,
    "votes": {
      "B": 100
    },
    "questionPage": 26
  },
  {
    "id": 56,
    "stem": "一家医疗公司正在使用Amazon Bedrock开发实时患者护理AI助手，用于响应对不同部门的查询请求，这些部门分别处理临床咨询、保险核实、预约安排和保险理赔业务。该公司希望采用多智能体架构。\n该公司必须确保AI助手具备可扩展性，能够为患者新增功能。AI助手必须能够处理数千个并行患者交互。该公司必须确保患者能获得符合对应领域要求的查询响应。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "通过独立知识库隔离每个智能体的数据。使用IAM过滤控制对每个知识库的访问。部署一个监管智能体，对患者咨询执行自然语言意图分类。配置该监管智能体，将查询路由到专门的协作者智能体，以响应特定部门的查询。将每个专门的协作者智能体配置为结合对应智能体的部门特定知识库使用Retrieval Augmented Generation (RAG)。",
      "B": "为每个部门创建独立的监管智能体。配置单独的协作者智能体，对每个部门内的各个专业领域执行自然语言意图分类。仅将每个协作者智能体与对应部门的特定知识库集成。在监管智能体之间实现手动交接流程。",
      "C": "在独立知识库中隔离每个部门的数据。使用IAM过滤控制对每个知识库的访问。部署单个通用智能体。在该通用智能体内配置多个动作组，以执行特定部门的功能。在通用智能体指令内实现基于规则的路由逻辑。",
      "D": "部署多个独立的监管智能体并行运行，以响应每个部门的患者查询。为每个监管智能体配置多个协作者智能体。将所有智能体与同一个知识库集成。使用外部路由逻辑合并来自多个监管智能体的响应。"
    },
    "answer": [
      "A"
    ],
    "page": 30,
    "explanation": "由监管智能体判断来意，例如预约、保险或临床查询，再将请求交给对应的专门智能体。每个智能体只获得其业务所需知识库的权限。增加新部门时可以新增协作者，无须复制全部敏感资料到一个共享知识库。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 73,
    "votes": {
      "A": 100
    },
    "questionPage": 27
  },
  {
    "id": 57,
    "stem": "某公司使用AI助手应用程序总结公司网站内容，并向客户提供信息。该公司计划使用Amazon Bedrock让应用程序访问基础模型（FM）。\n该公司需要将AI助手应用程序部署到开发环境和生产环境。解决方案必须将这些环境与FM集成。公司希望在每个环境中测试不同FM的效果。解决方案必须允许产品负责人在每个环境中为测试目的轻松切换不同FM。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "创建一个AWS CDK应用程序。在AWS CodePipeline中创建多条流水线。为每条流水线配置各自的FM设置。配置应用程序使用aws_bedrock.ProvisionedModel.fromProvisionedModelArn()方法调用Amazon Bedrock FM。",
      "B": "为每个环境创建单独的AWS CDK应用程序。配置应用程序使用aws_bedrock.FoundationModel.fromFoundationModelId()方法调用Amazon Bedrock FM。在AWS CodePipeline中为每个环境创建单独的流水线。",
      "C": "创建一个AWS CDK应用程序。配置应用程序使用aws_bedrock.FoundationModel.fromFoundationModelId()方法调用Amazon Bedrock FM。在AWS CodePipeline中创建一条流水线，该流水线为每个环境设置一个使用AWS CodeBuild部署动作的部署阶段。",
      "D": "为生产环境创建一个AWS CDK应用程序。配置应用程序使用aws_bedrock.ProvisionedModel.fromProvisionedModelArn()方法调用Amazon Bedrock FM。在AWS CodePipeline中创建一条流水线。配置流水线使用AWS CodeBuild部署动作部署到生产环境。对于开发环境，参考生产应用程序代码手动重建资源。"
    },
    "answer": [
      "C"
    ],
    "page": 31,
    "explanation": "用一套 CDK 定义为开发和生产创建各自的部署阶段，模型 ID 则按环境参数化，便于复现测试和发布。fromFoundationModelId 引用一个已有模型。实际执行推理的仍是带调用权限的应用运行时。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 74,
    "votes": {
      "C": 100
    },
    "questionPage": 27
  },
  {
    "id": 58,
    "stem": "一家酒店企业希望通过添加AI功能来增强基于Java的传统酒店管理系统（PMS）。该企业希望使用Amazon Bedrock知识库为员工提供客房可用性信息和酒店特定详情。解决方案必须对企业管理的每家酒店维护独立的访问控制，必须提供近实时的客房可用性信息，并且必须在高峰使用时段保持稳定性能。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "部署一个包含所有酒店合并数据的Amazon Bedrock知识库。配置AWS Lambda函数，通过直接API连接同步每家酒店PMS数据库的数据。启用带有酒店特定筛选条件的AWS CloudTrail日志记录，审计每家酒店数据的访问日志。",
      "B": "为每家酒店创建一条Amazon EventBridge规则，该规则在每家酒店的PMS数据库发生变更时触发。配置该规则将更新发送到管理AWS账户中的集中式Amazon Bedrock知识库。配置基于资源的策略，对酒店员工强制执行酒店特定的访问控制。",
      "C": "在多账户架构中为每家酒店部署一个Amazon Bedrock知识库。使用直接数据ingestion 提供实时客房可用性信息。对非关键信息安排定期同步。",
      "D": "构建一个使用多个知识库的集中式Amazon Bedrock代理。实施AWS IAM Identity Center，并配置酒店特定的权限集来控制酒店员工的数据访问。"
    },
    "answer": [
      "C"
    ],
    "page": 31,
    "explanation": "每家酒店的账户和知识库分别授权，减少租户之间的资料混用。变化快的可用性可直接摄取，酒店介绍等较稳定资料按期同步。索引变更有可见延迟，真正订房时仍应从酒店管理系统确认库存。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 75,
    "votes": {
      "C": 100
    },
    "references": [
      {
        "title": "AWS · 直接摄取知识库文档",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-direct-ingestion.html"
      }
    ],
    "questionPage": 28
  },
  {
    "id": 59,
    "stem": "某公司正在使用AWS Lambda实现无服务器推理API。该API将动态调用托管在Amazon Bedrock上的多个AI模型。公司需要设计一个解决方案，能够在不修改或重新部署Lambda代码的情况下实时切换模型提供商。设计必须包含配置变更的安全上线，以及验证和回滚能力。\n哪种解决方案符合这些要求？",
    "options": {
      "A": "将活动模型提供商存储在AWS Systems Manager Parameter Store中。配置Lambda函数在运行时读取参数，以确定要调用哪个模型。",
      "B": "将活动模型提供商存储在AWS AppConfig中。配置Lambda函数在运行时读取配置，以确定要调用哪个模型。",
      "C": "配置Amazon API Gateway REST API将请求路由到不同的Lambda函数。将每个Lambda函数硬编码到特定的模型提供商。手动切换集成目标。",
      "D": "将活动模型提供商存储在托管在Amazon S3上的JSON文件中。使用AWS AppConfig将该S3文件引用为托管配置源。配置Lambda函数在运行时通过AppConfig读取文件，以确定要调用哪个模型。"
    },
    "answer": [
      "B"
    ],
    "page": 32,
    "explanation": "把当前供应商或模型 ID 放到 AppConfig，通过配置发布切换供应商。Lambda 在运行时读取该配置并调用对应模型，回滚也只需恢复之前的配置版本。把供应商硬编码会让每次切换都依赖应用部署。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 76,
    "votes": {
      "B": 83,
      "D": 17
    },
    "questionPage": 28
  },
  {
    "id": 60,
    "stem": "某公司正在构建一个生成式AI（GenAI）应用程序，该应用使用Amazon Bedrock API处理复杂的客户查询。在高峰使用时段，应用会出现间歇性API超时，导致响应块损坏、数据交付延迟等问题。在处理长度不一的复杂客户查询时，应用难以确保提示词保持在令牌限制范围内。用户报告存在输入截断和响应不完整的问题。该公司还观察到基础模型（FM）调用失败。\n该公司需要一种重试策略，能够自动处理瞬时服务错误，避免在高峰使用时段压垮Amazon Bedrock。该策略还必须适应不断变化的服务可用性，并支持响应流式传输和令牌感知的请求处理。\n哪种方案可以满足这些要求？",
    "options": {
      "A": "对所有错误实施标准重试策略，尝试之间使用1秒固定延迟，最大重试次数为3次。通过重新启动流来处理流式响应超时。限制每个会话的令牌使用量。",
      "B": "实施自适应重试策略，使用带抖动的指数退避，并且采用熔断器模式，当错误率超过预定义阈值时临时禁用重试。实施流式响应处理程序，监控块交付超时。将该处理程序配置为缓冲已成功接收的块，并在重新建立连接时从上一个接收块智能恢复流式传输。",
      "C": "使用AWS SDK在标准模式下配置重试策略。将Amazon Bedrock API调用包装在处理超时异常的try-catch块中。为失败的流式请求返回缓存的补全结果。对所有用户强制执行全局令牌限制。为每个请求添加基于抖动的重试逻辑和轻量级令牌修剪。通过仅从故障点请求缺失块来恢复中断的流。在内存中维护最近块的小型缓冲区，最大限度减少冗余数据传输。",
      "D": "将Amazon Bedrock客户端请求超时设置为30秒。实施客户端负载丢弃。缓冲部分结果，并在应用性能开始下降时停止新请求。为所有请求设置静态令牌使用上限。配置指数退避重试、动态块大小调整和上下文感知令牌限制。"
    },
    "answer": [
      "B"
    ],
    "page": 32,
    "explanation": "标答 B 用带抖动的退避和熔断减少瞬时故障造成的重试风暴。讨论对断点续传有分歧，InvokeModelWithResponseStream 没有请求「从某个块继续」的通用参数，缓存只能保留已经到达客户端的内容。请求前还要独立检查令牌预算。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 77,
    "votes": {
      "B": 75,
      "C": 25
    },
    "references": [
      {
        "title": "AWS · InvokeModelWithResponseStream 请求参数",
        "url": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModelWithResponseStream.html"
      }
    ],
    "questionPage": 29
  },
  {
    "id": 61,
    "stem": "某银行正在开发由生成式AI（GenAI）驱动的AI助手，该助手使用Amazon Bedrock为银行网站用户提供账户查询和财务指导协助。银行必须确保该AI助手不会在客户交互中泄露任何个人可识别信息（PII）。\n该AI助手不得在发往GenAI模型的提示中发送PII，且不得响应客户提供投资建议的请求。银行必须收集所有客户交互的审计日志，包括客户交互过程中传输的任何图像或文档。\n哪个解决方案能够以最少的运维工作量满足这些要求？",
    "options": {
      "A": "使用Amazon Macie检测并脱敏用户输入和模型响应中的PII。应用提示工程技术强制模型规避投资建议主题。使用AWS CloudTrail捕获对话日志。",
      "B": "使用AWS Lambda函数和Amazon Comprehend检测并脱敏PII。使用Amazon Comprehend主题建模阻止AI助手讨论投资建议主题。在Amazon CloudWatch中设置自定义指标来捕获客户对话。",
      "C": "配置Amazon Bedrock防护栏（guardrails），应用敏感信息策略检测并过滤PII。设置主题策略确保AI助手规避投资建议主题。使用Converse API记录模型调用日志。启用向Amazon S3交付日志和图像日志功能。",
      "D": "使用正则表达式控件匹配PII模式。应用提示工程技术避免向客户返回PII或投资建议主题。启用模型调用日志、交付日志和向Amazon S3的图像日志功能。"
    },
    "answer": [
      "C"
    ],
    "page": 33,
    "explanation": "敏感信息过滤器应在输入送到模型前处理 PII，并检查模型输出。拒绝主题处理索要投资建议的请求。Converse 的调用日志要显式启用并选择所需模态与 S3 目的地，才能留存图像、文档等审计材料。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 78,
    "votes": {
      "C": 100
    },
    "references": [
      {
        "title": "AWS · 模型调用日志与多模态数据",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
      }
    ],
    "questionPage": 29
  },
  {
    "id": 62,
    "stem": "一家金融服务公司正在开发一款客户服务AI助手应用程序，该应用程序使用Amazon Bedrock中的基础模型（FM）。应用程序必须提供透明的响应，需要记录推理过程，并引用检索增强生成（RAG）所用的来源。应用程序必须捕获所有响应用户内容的完整审计追踪。该应用程序必须能够支持最多10000个并发用户，并在2秒内响应每个客户查询。\n以下哪种解决方案满足这些需求，同时运营开销最低？",
    "options": {
      "A": "为Amazon Bedrock智能体启用追踪。配置结构化提示，引导FM提供证据呈现。将Amazon Bedrock知识库与数据源集成以启用RAG。配置应用程序以引用并标明权威内容的来源。在多可用区架构中部署应用程序。使用Amazon API Gateway和AWS Lambda函数扩展应用程序。使用Amazon CloudFront提供低延迟交付。",
      "B": "为Amazon Bedrock智能体启用追踪。将自定义RAG管道与Amazon OpenSearch Service集成，以检索来源并标注来源。配置结构化提示来展示检索到的证据。将应用程序部署在Amazon API Gateway REST API之后。使用AWS Lambda函数和Amazon CloudFront扩展应用程序并提供低延迟。将日志存储在Amazon S3中，并使用AWS CloudTrail捕获审计追踪。",
      "C": "使用Amazon CloudWatch监控延迟和错误率。将模型提示直接嵌入应用程序后端以标注来源。将应用程序与用户的交互存储在Amazon RDS中，用于审计。",
      "D": "将生成的响应和支撑证据存储在Amazon S3存储桶中。启用存储桶版本控制用于审计。使用AWS Glue编目检索到的文档。在Amazon Athena中处理检索到的文档，以生成定期合规报告。"
    },
    "answer": [
      "A"
    ],
    "page": 33,
    "explanation": "知识库引用让用户能核对证据，Agent trace 留下检索和工具调用经过，应用再把交付的回答和审计标识关联保存。API Gateway、Lambda 和多可用区部署有助于扩展。实际的一万并发与两秒目标要测试完整推理链路。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 79,
    "votes": {
      "A": 100
    },
    "questionPage": 30
  },
  {
    "id": 63,
    "stem": "一家医疗保健公司正在开发一个文档管理系统，用于将医学研究论文存储在Amazon S3存储桶中。该公司需要构建一个全面的元数据框架，以提高用于分析研究论文的生成式人工智能（GenAI）应用程序的搜索精度。元数据框架必须包含文档时间戳、作者信息和研究领域分类。\n该解决方案必须在所有上传文档之间保持一致的元数据结构，并且必须让基础模型（FM）无需访问完整内容即可理解文档上下文。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "将文档时间戳存储在Amazon S3系统元数据中。使用S3对象标签实现领域分类。使用自定义用户定义元数据存储作者信息。",
      "B": "设置带有合法保留的S3 Object Lock来跟踪文档时间戳。使用S3对象标签存储作者信息。为领域分类配置S3访问点。",
      "C": "使用S3清单报告跟踪文档时间戳。创建S3访问点实现领域分类。将作者信息存储在S3 Storage Len仪表盘中。",
      "D": "使用自定义用户定义元数据存储作者信息。使用S3 Object Lock保留期跟踪文档时间戳。使用S3 Event Notifications实现领域分类。"
    },
    "answer": [
      "A"
    ],
    "page": 34,
    "explanation": "S3 提供系统生成的对象修改时间，用户元数据可存作者，标签可存研究领域。统一这些字段并在构建索引或提示词时显式读取它们，便能在不读取整篇论文的情况下提供上下文。论文的发表日期需要单独保存。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 80,
    "votes": {
      "A": 100
    },
    "questionPage": 30
  },
  {
    "id": 64,
    "stem": "Example Corp为数百万企业客户提供个性化视频生成服务。客户通过向公司自研生成式AI（GenAI）模型提交提示词来生成营销视频。为了提升输出内容的相关性和个性化程度，Example Corp希望利用客户特定上下文（如产品偏好、客户属性和业务历史）来优化提示词。\n客户有严格的数据治理要求，必须完全拥有并控制自身数据。客户不需要实时访问，但语义准确率必须很高，且检索延迟必须保持低位，以支撑客户体验用例。\nExample Corp希望最大限度降低集成模式的架构复杂性，除非必要，否则不希望在每个客户的环境中部署和管理服务。\n哪个解决方案能够满足这些需求？",
    "options": {
      "A": "要求每个客户设置包含客户内部数据的Amazon Q Business索引，要求每个客户指定Example Corp为数据访问者，允许Example Corp通过安全API检索相关内容，以便在运行时丰富提示词。",
      "B": "通过为每个客户部署实时MCP服务器，结合Model Context Protocol (MCP)使用联合搜索，在提示词生成过程中实时检索数据。",
      "C": "要求每个客户配置Amazon Bedrock知识库，允许跨账户查询，以便Example Corp检索结构化数据用于提示词增强。",
      "D": "配置Amazon Kendra抓取客户数据源，将生成的索引跨账户共享，以便Example Corp查询每个客户的Amazon Kendra索引来获取增强数据。"
    },
    "answer": [
      "A"
    ],
    "page": 34,
    "explanation": "客户可以保留自己的 Amazon Q 索引，并授权已验证的外部软件商按权限检索内容，平台只取当前请求所需材料。社区也有不少人选择每租户 Bedrock 知识库，但 A 明确利用了 Amazon Q 的 data accessor 机制。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 81,
    "votes": {
      "A": 53,
      "C": 41,
      "B": 6
    },
    "references": [
      {
        "title": "AWS · 通过数据访问者共享 Amazon Q 索引",
        "url": "https://docs.aws.amazon.com/amazonq/latest/qbusiness-ug/data-accessors.html"
      }
    ],
    "questionPage": 31
  },
  {
    "id": 65,
    "stem": "某公司正在构建一个法律研究AI助手，该助手使用Amazon Bedrock和Anthropic Claude基础模型（FM）。该AI助手必须检索高度相关的判例法文件，以增强FM的响应能力。该AI助手必须能够识别法律概念、特定法律术语和引用之间的语义关系，并且必须快速执行并返回精确结果。\n哪种解决方案能够满足这些要求？",
    "options": {
      "A": "将Amazon Bedrock知识库配置为使用默认向量搜索配置。使用Amazon Bedrock扩展查询，以改进基于特定术语和引用的法律文档检索效果。",
      "B": "使用Amazon OpenSearch服务部署混合搜索架构，该架构结合了向量搜索和关键字搜索。应用Amazon Bedrock重排序模型优化结果相关性。",
      "C": "为最终用户启用Amazon Kendra查询建议功能。使用Amazon Bedrock对搜索结果进行后处理，以识别文档中的语义相似性并生成精确结果。",
      "D": "使用带向量搜索功能的Amazon OpenSearch Service和Amazon Bedrock Titan嵌入对法律文档建立索引并执行搜索。使用自定义AWS Lambda函数将结果与存储在Amazon RDS数据库中基于关键字的过滤器合并。"
    },
    "answer": [
      "B"
    ],
    "page": 35,
    "explanation": "关键词检索能找到案件编号、引文和精确术语，向量检索能找到表达不同但法律概念相关的材料。合并候选后再用重排序模型结合整条查询评分，最后选出的判例更贴合具体问题。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 83,
    "votes": {
      "B": 100
    },
    "questionPage": 31
  },
  {
    "id": 66,
    "stem": "某公司在多个业务部门部署了多个基于Amazon Bedrock的生成式AI（GenAI）应用，用于客户服务、内容生成和文档分析。部分应用的令牌消耗模式不可预测。该公司需要一个全面的可观测性解决方案，以实时了解多个模型的令牌使用模式。该可观测性解决方案必须支持面向多个利益相关方群体的自定义仪表板，并能够对公司应用使用的所有基础模型的令牌消耗发出告警。\n哪种解决方案组合能够以最低的运营开销满足这些需求？（请选两项）",
    "options": {
      "A": "使用Amazon CloudWatch指标作为数据源，创建自定义Amazon QuickSight仪表板，展示令牌使用趋势和各基础模型（FM）的使用模式。",
      "B": "使用Amazon CloudWatch Logs Insights分析Amazon Bedrock调用日志，按应用划分获取令牌消耗模式和使用归属。创建自定义查询识别高使用场景。在仪表板中添加日志小组件，实现持续监控。",
      "C": "创建自定义Amazon CloudWatch仪表板，整合Amazon Bedrock原生的令牌和调用CloudWatch指标。配置CloudWatch告警监控令牌使用阈值。",
      "D": "通过Amazon Bedrock与Amazon Managed Grafana的零ETL集成，创建可展示公司所有基础模型令牌使用趋势和模式的仪表板。",
      "E": "实现Amazon EventBridge规则来捕获Amazon Bedrock模型调用事件。将令牌使用数据路由到目标为Amazon OpenSearch Serverless的Amazon Data Firehose传输流。使用OpenSearch仪表板分析使用模式。"
    },
    "answer": [
      "B",
      "C"
    ],
    "page": 35,
    "explanation": "CloudWatch 原生输入和输出令牌指标适合按模型汇总、画趋势、设告警。调用日志和 Logs Insights 则可按应用标识进一步归因。记录请求时必须保留可筛选的应用字段，否则同一模型的使用量无法区分到各个团队。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 84,
    "votes": {
      "BC": 82,
      "B": 9,
      "CD": 9
    },
    "questionPage": 32
  },
  {
    "id": 67,
    "stem": "某公司正在设计一个使用基础模型（FM）支持多项AI工作负载的解决方案。部分基础模型需要按需实时调用。其他基础模型则需要为批处理提供持续的高吞吐量访问。\n该解决方案必须支持混合部署模式，能够在云基础设施和本地基础设施上运行工作负载，以满足数据驻留和合规要求。\n下列哪组步骤组合能够满足这些需求？（请选择两项。）",
    "options": {
      "A": "使用AWS Lambda编排低延迟FM推理，调用托管在Amazon SageMaker AI异步端点上的FM。",
      "B": "在Amazon Bedrock中配置预配置吞吐量，确保高流量工作负载获得稳定性能。",
      "C": "将FM部署到支持边缘部署的Amazon SageMaker AI端点，使用Amazon SageMaker Neo。通过AWS Lambda编排FM，支持混合部署。",
      "D": "使用带有自动扩缩容的Amazon Bedrock处理不可预测的流量峰值。",
      "E": "使用Amazon SageMaker JumpStart托管和调用FM。"
    },
    "answer": [
      "B",
      "C"
    ],
    "page": 36,
    "explanation": "B 对应云端持续负载的预置容量，C 的出题意图是为本地或边缘保留可运行模型。讨论指出 SageMaker Neo 只为特定框架、模型和硬件做编译优化，不能据此假定任意 Bedrock 模型都能作为本地端点部署。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 86,
    "votes": {
      "BC": 67,
      "BD": 33
    },
    "references": [
      {
        "title": "AWS · SageMaker Neo 支持的边缘设备和框架",
        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/neo-supported-devices-edge.html"
      }
    ],
    "questionPage": 32
  },
  {
    "id": 68,
    "stem": "某公司计划将多个生成式AI（GenAI）应用程序部署到五个独立业务单元，这些业务单元分布在欧洲和美洲的多个国家/地区。每个应用程序都使用Amazon Bedrock检索增强生成（RAG）模式，并配有特定业务单元的知识库，用于存储TB级非结构化数据。\n公司必须为所有GenAI应用程序的安全控制、可观测性实践和部署模式构建架构良好的标准化组件。这些组件必须可复用、支持版本控制，并实现统一管控。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "为GenAI应用程序配置Amazon API Gateway REST API端点。基于标准化AWS CloudFormation模板中的AWS Well-Architected Generative AI Lens部署通用安全、可观测性和RAG模式。部署后使用CloudFormation Guard验证每个业务单元的策略合规性。",
      "B": "创建标准化AWS CloudFormation模板，以实现基于AWS Well-Architected Generative AI Lens的安全、可观测性和RAG模式。建立执行版本控制的集中式存储库。将CI/CD流水线与CloudFormation Guard集成，以在各业务单元间强制实施一致且可重复的部署。",
      "C": "使用AWS Service Catalog为每个业务单元定义标准化产品组合和版本化产品。使用这些产品组合强制实施基于AWS Well-Architected Generative AI Lens的安全、可观测性和RAG模式。要求业务单元使用Service Catalog控制台部署资源。",
      "D": "在共享设计文档中记录基于AWS Well-Architected Generative AI Lens的安全控制、可观测性要求和RAG模式。使用Amazon Macie强制实施部署。将实施责任委派给每个业务单元。"
    },
    "answer": [
      "B"
    ],
    "page": 36,
    "explanation": "CloudFormation 模板固定知识库、访问控制和监控配置，版本库保存各地团队采用的版本。CI/CD 在部署前运行 CloudFormation Guard 检查，才能阻止某个团队的模板更改绕过组织规则。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 87,
    "votes": {
      "B": 83,
      "C": 17
    },
    "questionPage": 33
  },
  {
    "id": 69,
    "stem": "某公司升级了其基于Amazon Bedrock的基础模型（FM），该模型支持多语言客户服务助手。升级后，助手在不同语言中表现出不一致的行为。当收到完全相同的问题时，助手开始在部分语言中生成不同的响应。\n该公司需要一个解决方案，以便在未来更新时检测并解决类似问题。评估必须在45分钟内完成对所有支持语言的检测，必须能够并行处理至少15000条测试对话，评估流程必须完全自动化并集成到CI/CD管道中，并且如果未达到质量阈值，解决方案必须阻止部署。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "创建一个分布式流量模拟框架，同时向多种语言的助手发送翻译密集型工作负载。使用Amazon CloudWatch指标监控延迟、并发和吞吐量。在生产发布前运行模拟，识别基础设施瓶颈。",
      "B": "通过Amazon Route 53基于延迟的路由和AWS Global Accelerator将助手部署到多个AWS区域，提升全球性能。将多语言对话日志存储在Amazon S3中。每周开展部署后审计，检查一致性。",
      "C": "创建预处理流水线，在将消息发送给助手之前将所有传入消息规范化为一致格式。应用基于规则的检查，标记输出中潜在的幻觉。将评估重点放在规范化文本上，简化跨语言测试。",
      "D": "设置含义完全一致的标准化多语言测试对话。使用Amazon Bedrock模型评估作业并行运行这些测试对话。设置相似度和幻觉阈值。将该流程集成到CI/CD管道中，阻止不通过的发布。"
    },
    "answer": [
      "D"
    ],
    "page": 37,
    "explanation": "同一组问题翻译成语义等价的多语言对话，用相同标准比较回答一致性及依据。各语言并行评估，未达到阈值即阻止当前版本部署。测试吞吐和作业启动开销须共同计入 45 分钟预算。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 88,
    "votes": {
      "D": 100
    },
    "questionPage": 33
  },
  {
    "id": 70,
    "stem": "某公司正在开发一款使用Amazon Bedrock基础模型（FM）的生成式AI（GenAI）应用程序。该应用程序集成了多个自定义工具。尽管用户流量保持稳定，但应用程序仍出现了意外的令牌消耗量激增问题。\n该公司需要一个解决方案，利用Amazon Bedrock模型调用日志来监控InputTokenCount指标和OutputTokenCount指标。该解决方案必须检测工具使用中的异常模式，并识别出哪些特定工具集成导致了异常令牌消耗，还必须随着流量模式变化自动调整阈值。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "使用Amazon CloudWatch Logs捕获模型调用日志。基于InputTokenCount指标和OutputTokenCount指标创建CloudWatch控制面板。为每个工具集成配置固定阈值的静态CloudWatch告警。",
      "B": "将模型调用日志存储在Amazon S3存储桶中。使用AWS Glue对日志进行编目。通过计划执行的Amazon Athena查询分析令牌消耗模式，生成工具使用趋势报告。",
      "C": "使用Amazon CloudWatch Logs捕获模型调用日志。创建CloudWatch指标过滤器来提取特定于工具的调用模式。应用CloudWatch异常检测告警，为每个工具的指标调整基线。",
      "D": "将模型调用日志存储在Amazon S3存储桶中。创建AWS Lambda函数实时处理日志。根据Lambda函数识别出的令牌消耗趋势手动更新Amazon CloudWatch告警阈值。"
    },
    "answer": [
      "C"
    ],
    "page": 37,
    "explanation": "在调用日志中保留工具名称、调用标识和输入输出令牌数，才有机会定位哪个工具引起增长。为各工具生成指标，再用 CloudWatch 异常检测学习各自的日常波动，可避免用统一静态阈值掩盖局部异常。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 89,
    "votes": {
      "C": 86,
      "D": 14
    },
    "questionPage": 34
  },
  {
    "id": 71,
    "stem": "某公司正在使用Amazon Bedrock开发人工智能驱动的应用程序，该程序使用支持跨区域推理和预置吞吐量的基础模型（FM）。应用程序需要为欧洲和北美用户提供持续的低延迟访问，且必须符合数据驻留法规要求，即欧洲用户数据必须保留在欧洲的AWS区域内。\n在测试期间，当区域流量峰值达到服务配额时，应用程序出现服务降级。该公司需要一个能够维持应用弹性并最大限度降低运营复杂度的解决方案。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "在北美和欧洲区域分别部署独立的Amazon Bedrock实例。使用自定义路由层根据用户位置转发流量。配置Amazon CloudWatch告警监控区域服务用量。当用量接近指定阈值时，通过Amazon SNS向公司发送邮件告警。",
      "B": "使用Amazon Bedrock跨区域推理配置文件，在应用程序调用InvokeModel API时，在配置文件ID中指定地理区域代码。配置独立的Amazon API Gateway HTTP API，将欧洲和北美用户引导至对应的区域终端节点。",
      "C": "部署多区域Amazon API Gateway HTTP API和AWS Lambda函数，通过Lambda实现重试逻辑处理限流。当主区域达到服务配额时，配置Lambda函数调用最近的备用区域的FM。使用智能路由确保符合数据驻留要求。",
      "D": "在多个区域为Amazon Bedrock配置预置吞吐量。在应用代码中实现故障转移逻辑，当发生限流时在区域之间切换。使用AWS Global Accelerator根据用户位置将流量路由到对应的终端节点。"
    },
    "answer": [
      "B"
    ],
    "page": 38,
    "explanation": "分别为欧洲和北美请求选择相应地理范围的推理配置文件，区域入口据此路由。Bedrock 可以在该文件允许的区域间调配容量。涉及数据驻留时要核对文件实际列出的每个目标区域。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 90,
    "votes": {
      "B": 100
    },
    "references": [
      {
        "title": "AWS · 跨区域推理配置文件与目标区域",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html"
      }
    ],
    "questionPage": 34
  },
  {
    "id": 72,
    "stem": "一家跨国公司正在构建一个使用RAG的AI助手。该公司希望AI助手具备近实时、低延迟的性能。AI助手必须为多个地理区域提供服务。公司客户会将专有数据用于AI助手，且专有数据不得离开公司所在的直接地理区域。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "在Amazon Bedrock部署模型并创建跨区域模型推理配置文件。在公司运营的每个AWS区域创建Amazon S3存储桶，将知识库存储在对应区域的S3存储桶中。在每个区域配置Amazon Kendra与对应知识库交互，在每个区域配置AWS Lambda函数，该函数使用Kendra和Amazon Bedrock处理AI助手提示词。",
      "B": "在公司运营的每个AWS区域部署Amazon Bedrock模型。配置Amazon Bedrock跨区域模型推理配置文件。配置使用Amazon Bedrock Knowledge Bases的向量数据库，将知识库存储在公司运营的每个区域的Amazon S3中。",
      "C": "使用AWS Outposts在公司运营的每个AWS区域部署一个Outposts。在每个对应区域创建Amazon S3存储桶来存储知识库。将配置为向量数据库的Amazon RDS部署到每个Outposts。在中心区域部署带有跨区域推理配置文件的Amazon Bedrock模型。",
      "D": "在公司运营的每个AWS Local Zone配置存储在Amazon S3 Express One Zone存储类中的知识库。在公司运营的每个Local Zone使用Amazon RDS部署向量数据库。将大语言模型（LLM）部署到每个Local Zone的Amazon EC2实例上。配置AI助手将提示词路由到对应Local Zone中的模型。"
    },
    "answer": [
      "B"
    ],
    "page": 38,
    "explanation": "把数据源、向量索引和知识库就近落在各自允许的地理范围，推理配置文件也只能覆盖同一允许范围。社区分歧在于「所在地理区域」的边界。若规定严格到单个 AWS Region，通用跨区域推理文件就不能直接满足它。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 91,
    "votes": {
      "B": 63,
      "D": 38
    },
    "references": [
      {
        "title": "AWS · 跨区域推理配置文件与目标区域",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html"
      }
    ],
    "questionPage": 35
  },
  {
    "id": 73,
    "stem": "某公司正在构建一个生成式AI（GenAI）应用程序，用于处理财务报告并为分析师提供摘要。该应用程序必须运行两个计算环境。在第一个环境中，AWS Lambda函数必须使用Python SDK按需分析报告。在第二个环境中，Amazon EKS容器必须使用JavaScript SDK按计划批量处理多个报告。应用程序必须在多轮交互过程中维持对话上下文，在两个环境中使用同一个基础模型（FM），并确保一致的身份验证。\n以下哪个解决方案能够满足这些要求？",
    "options": {
      "A": "对每个环境使用单独的身份验证方法，调用Amazon Bedrock InvokeModel API。将会话状态存储在Amazon DynamoDB中。为每种编程语言自定义I/O格式化逻辑。",
      "B": "直接在两个环境中使用Amazon Bedrock Converse API，并采用基于IAM角色的通用身份验证机制。将会话状态存储在Amazon ElastiCache中。为模型参数创建特定于编程语言的封装器。",
      "C": "创建一个集中式Amazon API Gateway REST API端点，通过InvokeModel API处理所有模型交互。将交互历史存储在每个Lambda函数或EKS容器的应用进程内存中。使用环境变量配置模型参数。",
      "D": "使用Amazon Bedrock Converse API和IAM角色进行身份验证。在请求的消息数组中传入历史消息以维持对话上下文。使用特定编程语言的SDK来建立一致的API接口。"
    },
    "answer": [
      "D"
    ],
    "page": 39,
    "explanation": "Converse 在 Python 和 JavaScript SDK 中提供相同的消息结构。每轮把所需对话历史放进 messages，并让 Lambda 与 EKS 各自使用被授权的执行角色，便能调用同一模型并维持上下文。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 92,
    "votes": {
      "D": 100
    },
    "questionPage": 35
  },
  {
    "id": 74,
    "stem": "某公司正在构建一个无服务器应用程序，使用AWS Lambda函数为全球学生整理笔记摘要。该应用程序通过Amazon Bedrock使用Anthropic Claude。公司发现大部分流量产生于各时区的晚间时段。用户反馈在自身时区的高峰使用时段遇到限流错误。\n公司需要解决限流问题，确保应用程序持续运行，同时解决方案必须维持应用的性能质量，并且在低流量时段不会产生固定每小时成本。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "创建自定义Amazon CloudWatch指标来监控模型错误。将预配置吞吐量设置为一个安全高于观测到的高峰流量的值。",
      "B": "创建自定义Amazon CloudWatch指标来监控模型错误。设置故障转移机制，当错误超过指定阈值时，将调用重定向到备用AWS区域。",
      "C": "在Amazon Bedrock中启用调用日志。监控关键指标，如Invocations、InputTokenCount、OutputTokenCount和InvocationThrottles。将流量分布到跨区域推理端点。",
      "D": "在Amazon Bedrock中启用调用日志。监控InvocationLatency、InvocationClientErrors和InvocationServerErrors指标。将流量分布到同一模型的多个版本。"
    },
    "answer": [
      "C"
    ],
    "page": 39,
    "explanation": "按时区轮流出现的峰值适合按需跨区域推理，可在允许区域之间分散流量，并减少长时间购买固定容量的成本。记录模型调用、令牌和限流指标，才能判断峰值来自请求数还是单个请求变长。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 93,
    "votes": {
      "C": 100
    },
    "questionPage": 36
  },
  {
    "id": 75,
    "stem": "某公司正在开发一款全新的人工智能驱动应用，该应用需要与各种专业工具集成。这些工具当前以模型上下文协议（Model Context Protocol, MCP）服务器的形式运行在开发人员的本地机器上，且在调用之间不维护状态。该公司计划将每个MCP服务器部署为AWS Lambda函数，以支撑公司的生产应用。\n该解决方案必须同时可供内部应用和授权第三方合作伙伴访问，且必须使用严格的身份验证与授权控制。\n以下哪项额外步骤能够满足这些要求，同时带来的运营开销最低？",
    "options": {
      "A": "使用Lambda Invoke API创建自定义Lambda调用传输。实现IAM身份验证，并向授权用户和角色授予InvokeFunction权限。",
      "B": "通过Amazon API Gateway REST API端点暴露Lambda函数。使用API密钥进行身份验证。配置需要访问MCP服务器的应用使用标准HTTP请求，而非MCP协议。",
      "C": "创建Lambda函数URL，启用自定义可流式HTTP传输和SigV4。实现AWS IAM身份验证。向授权用户和角色授予InvokeFunctionUrl权限。",
      "D": "通过Amazon API Gateway HTTP API端点暴露Lambda函数，使用可流式HTTP传输。使用Amazon Cognito实现OAuth身份验证。配置API Gateway验证OAuth令牌。"
    },
    "answer": [
      "C"
    ],
    "page": 40,
    "explanation": "无状态 MCP 服务可用 Lambda 函数 URL 接收 Streamable HTTP，通过 AWS_IAM 和 SigV4 验证调用方。原选项的权限列举不全。AWS 规定从 2025 年 10 月起，新函数 URL 同时需要 InvokeFunctionUrl 与 InvokeFunction 权限。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 94,
    "votes": {
      "C": 63,
      "D": 25,
      "A": 13
    },
    "references": [
      {
        "title": "AWS · 调用 Lambda 函数 URL 所需的权限",
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/urls-auth.html"
      }
    ],
    "questionPage": 36
  },
  {
    "id": 76,
    "stem": "某公司拥有一个生成式AI（GenAI）应用程序，该应用使用Amazon Bedrock为客户查询提供实时响应。公司发现在流量高峰时段，对基础模型（FM）的API调用会出现间歇性故障。\n该公司需要一个解决方案来处理瞬时错误，并提供对FM性能的详细可观测性。该解决方案必须能够在限流事件期间防止级联故障，并跨服务边界提供分布式追踪，以识别导致延迟的因素。该解决方案还必须能够将性能问题与特定的FM特征相关联。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "实现自定义重试机制，重试之间固定延迟1秒。配置Amazon CloudWatch告警，监控应用程序的错误率和延迟指标。",
      "B": "为AWS SDK配置标准重试模式和带抖动的指数退避。使用带注解的AWS X-Ray追踪来识别和过滤服务组件。",
      "C": "实现所有FM响应的客户端缓存。在应用程序代码中添加自定义日志语句，记录API调用时长。",
      "D": "为AWS SDK配置自适应重试模式。使用AWS CloudTrail分布式追踪监控限流事件。"
    },
    "answer": [
      "B"
    ],
    "page": 40,
    "explanation": "SDK 只对适合重试的临时故障进行带抖动的退避，让大量客户端错峰重试。X-Ray 追踪标注模型 ID、请求类别等可筛选值，便可把某类慢调用定位为应用、网络或模型阶段的延迟。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 96,
    "votes": {
      "B": 71,
      "D": 14,
      "A": 14
    },
    "questionPage": 36
  },
  {
    "id": 77,
    "stem": "某公司正在AWS上构建一个视频分析平台。该平台将使用Amazon Rekognition和Amazon Bedrock分析大型视频存档。平台必须符合预定义的隐私标准，还必须使用安全的模型输入输出，控制基础模型（FM）的访问模式，并提供谁在何时访问了什么内容的审计记录。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "为Amazon Bedrock模型API调用配置VPC端点。实现Amazon Bedrock Guardrails，在提示词和响应中过滤有害或未授权内容。使用Amazon Bedrock跟踪事件记录所有代理和模型调用，用于审计。将跟踪导出到Amazon CloudWatch Logs，作为模型使用情况的审计记录。使用AWS KMS密钥的服务器端加密（SSE-KMS）将所有提示词和输出存储在Amazon S3中。",
      "B": "使用带有属性控制的IAM定义访问控制，将部门映射到特定权限。为Amazon Bedrock模型API调用配置VPC端点。使用IAM条件键强制指定GuardrailIdentifier和ModelId值。配置AWS CloudTrail捕获S3对象和KMS密钥使用活动的管理事件和数据事件。启用S3服务器访问日志，记录与视频存档的详细文件级交互。将所有CloudTrail日志发送到AWS CloudTrail Lake。设置Amazon CloudWatch警报，检测并告警来自Amazon Bedrock、Amazon Rekognition和AWS KMS的异常活动。",
      "C": "使用VPC端点策略限制对服务的访问。使用AWS Config跟踪资源变更和安全规则合规性。使用AWS KMS密钥的服务器端加密（SSE-KMS）加密静态数据。将模型的输入输出存储在独立的Amazon S3存储桶中。启用S3服务器访问日志跟踪文件级交互。",
      "D": "配置AWS CloudTrail Insights分析跨账户的API调用模式，检测Amazon Bedrock、Amazon Rekognition、Amazon S3和AWS KMS中的异常活动。部署Amazon Macie扫描并分类视频存档。使用AWS KMS密钥的服务器端加密（SSE-KMS）加密所有存储数据。配置CloudTrail捕获KMS API使用事件，用于审计。配置Amazon EventBridge规则处理CloudTrail Insights异常和Macie发现结果。当检测到潜在安全问题时，使用CloudWatch警报触发自动通知和安全响应。"
    },
    "answer": [
      "B"
    ],
    "page": 41,
    "explanation": "按部门限制可调用的模型资源，并用 bedrock:GuardrailIdentifier 强制经过指定护栏。VPC 接口端点提供私有网络路径，CloudTrail 的相关管理和数据事件可记录谁访问了密钥或视频对象。三类控制分别管权限、传输和追溯。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 97,
    "votes": {
      "B": 100
    },
    "references": [
      {
        "title": "AWS · 强制模型请求使用指定护栏",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html"
      }
    ],
    "questionPage": 37
  },
  {
    "id": 78,
    "stem": "某保险公司使用现有的Amazon SageMaker AI基础设施支持一个基于Web的应用程序，该应用允许客户预测自己的保费金额。公司将用于训练SageMaker AI模型的客户数据存储在Amazon S3存储桶中。该数据集正在快速增长。公司需要一个解决方案来持续重新训练模型。当员工将新的客户数据文件上传到S3存储桶时，该解决方案必须自动重新训练模型并将其重新部署到应用程序中。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "使用AWS Glue对每个上传的文件运行ETL作业。配置ETL作业以使用AWS SDK调用SageMaker AI模型端点。在更新后的客户数据集上重新训练模型后，使用端点的实时推理重新部署模型。",
      "B": "创建一个AWS Lambda函数和webhook处理程序，以便在员工上传新文件时生成事件。配置SageMaker Pipelines在更新后的客户数据集上重新训练模型后重新部署模型。使用Amazon EventBridge创建事件总线。将Lambda函数事件设置为源，将SageMaker Pipelines设置为目标。",
      "C": "当员工向S3存储桶上传新文件时，创建一个带有AWS SDK集成的AWS Step Functions Express工作流，从S3存储桶检索客户数据。使用SageMaker Data Wrangler流将数据从S3存储桶导出到SageMaker Autopilot。在更新后的客户数据集上重新训练模型后，使用SageMaker Autopilot重新部署模型。",
      "D": "创建一个AWS Step Functions Standard工作流。配置第一个状态以调用AWS Lambda函数，响应员工向S3存储桶上传新文件的事件。使用SageMaker Pipelines中的流水线在更新后的客户数据集上重新训练模型后重新部署模型。使用工作流中的下一个状态在第一个状态收到响应后运行该流水线。"
    },
    "answer": [
      "D"
    ],
    "page": 42,
    "explanation": "新文件写入 S3 后由对象事件启动 Standard 工作流，随后运行 SageMaker Pipeline 完成重新训练、评估和部署。工作流跟踪每次训练结果，只有相应步骤成功后模型才进入下一阶段。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 98,
    "votes": {
      "D": 78,
      "B": 22
    },
    "questionPage": 37
  },
  {
    "id": 79,
    "stem": "某公司使用Amazon Bedrock实现了一个基于检索增强生成（RAG）的系统，为用户提供医疗信息服务。该公司需要比较多种分块策略，评估两个基础模型（FM）的生成质量，并强制执行部署质量阈值。\n哪个Amazon Bedrock评估配置能够满足这些需求？",
    "options": {
      "A": "创建一个仅检索的评估作业，使用Anthropic Claude Sonnet的支持版本作为评估模型。配置上下文相关性和上下文覆盖度指标。在单独的CI/CD管道中定义部署阈值。",
      "B": "创建一个检索并生成评估作业，使用自定义k精准率指标和采用1-5评分范围的大语言模型评审指标。在评估数据集中包含每种分块策略。使用Anthropic Claude Sonnet的支持版本评估两个FM的响应。",
      "C": "为每种分块策略和FM的组合创建单独的评估作业。使用Amazon Bedrock的内置正确性和完整性指标。在部署批准前手动审核分数。",
      "D": "设置一个使用多个仅检索评估作业的流水线来评估检索质量。为两个FM创建单独的评估作业，使用Amazon Nova Pro作为大语言模型评审模型。基于忠实度和引用精准率指标进行评估。"
    },
    "answer": [
      "B"
    ],
    "page": 42,
    "explanation": "每种分块策略都用相同问题和已标记相关的文档测试，Precision@k 衡量前 k 个结果中相关结果所占的比例。再用相同评审量表比较两个生成模型的回答，并在发布流程中按阈值检查两类分数。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 100,
    "votes": {
      "B": 100
    },
    "questionPage": 38
  },
  {
    "id": 80,
    "stem": "一家野生动物保护机构在全球运营动物园。该机构使用各类传感器、追踪器和音视频记录仪监测动物行为。该机构希望推出一个生成式AI（GenAI）助手，可接入多模态数据来研究动物行为。\n该GenAI助手必须支持自然语言查询、避免推测性的行为解读，并维护审计日志以用于伦理研究审核。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "将原始视频导入Amazon Rekognition，检测动物姿态和表情。使用Amazon Data Firehose将传感器和GPS数据流式传输到Amazon S3数据湖中。通过存储在AWS Systems Manager Parameter Store中的基础模板提示Amazon Bedrock基础模型（FM）。使用IAM策略控制访问权限。使用AWS CloudTrail进行审计日志记录。",
      "B": "使用Amazon SageMaker Processing和Amazon Transcribe预处理多模态数据。将摘要导入Amazon Bedrock检索增强生成（RAG）知识库。应用Amazon Bedrock防护机制限制推测性输出。使用AWS AppConfig管理提示模板。使用AWS CloudTrail记录研究活动以供审计。",
      "C": "使用Amazon OpenSearch Serverless对行为日志和遥测事件建立索引。使用Amazon Comprehend提取实体。使用Amazon Bedrock构建回答问题的层。将研究摘要嵌入OpenSearch Serverless文档。使用IAM控制访问权限。使用AWS CloudTrail记录用户与AI助手的交互。",
      "D": "将Amazon Q Business配置为联合跨Amazon S3、Amazon Kinesis和Amazon SageMaker Feature Store的数据。配置Amazon EventBridge调用数据导入作业。在将结果返回给用户之前，使用自定义AWS Lambda函数过滤大语言模型（LLM）输出以满足合规性要求。"
    },
    "answer": [
      "B"
    ],
    "page": 43,
    "explanation": "先把音频转录成文本、将传感器和视频观察整理成可检索记录，再让助手根据这些记录回答。要求引用观察证据并拒绝无依据推断，才能保留行为研究的可核查性。API 审计之外还应记录实际回答及其所用观察资料。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 101,
    "votes": {
      "B": 100
    },
    "questionPage": 38
  },
  {
    "id": 81,
    "stem": "某公司在AWS Organizations中使用启用了所有功能的组织来管理多个AWS账户。员工在多个账户中使用Amazon Bedrock。该公司必须防止特定主题和专有信息被包含在发送给Amazon Bedrock模型的prompt中，且必须确保员工只能使用经批准的Amazon Bedrock模型。公司对员工的IAM角色进行集中管理。\n哪一组解决方案组合可以满足这些要求？（请选择两项。）",
    "options": {
      "A": "为每位员工的IAM角色创建IAM权限边界。将权限边界配置为要求使用经批准的Amazon Bedrock防护栏标识符才能调用Amazon Bedrock模型。创建一个SCP，仅允许员工使用经批准的模型。",
      "B": "创建一个SCP，仅允许员工使用经批准的模型。将该SCP配置为要求员工在调用经批准模型的请求中指定防护栏标识符。",
      "C": "创建一个SCP，防止员工在调用模型的请求中未指定集中部署的防护栏标识符时调用该模型。在每位员工的IAM角色上创建权限边界，仅允许每位员工调用经批准的模型。",
      "D": "使用AWS CloudFormation创建带有阻止过滤策略的自定义Amazon Bedrock防护栏。使用堆栈集将该防护栏部署到组织中的每个账户。",
      "E": "使用AWS CloudFormation创建带有掩码过滤策略的自定义Amazon Bedrock防护栏。使用堆栈集将该防护栏部署到组织中的每个账户。"
    },
    "answer": [
      "B",
      "D"
    ],
    "page": 44,
    "explanation": "用 CloudFormation StackSets 把同一套拦截类护栏部署到各账户。组织级 SCP 限定允许调用的模型，并要求请求指定获准的护栏。只有护栏部署和调用时的强制检查同时生效，用户才能被一致约束。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 102,
    "votes": {
      "BD": 90,
      "D": 10
    },
    "references": [
      {
        "title": "AWS · 强制模型请求使用指定护栏",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html"
      }
    ],
    "questionPage": 39
  },
  {
    "id": 82,
    "stem": "某公司正在为生成式AI（GenAI）应用设计API，该应用使用托管模型服务上托管的基础模型（FM）。API必须对响应进行流式传输以降低延迟，强制实施令牌限制来管理计算资源使用量，并且实现重试逻辑来处理模型超时和部分响应。\n以下哪个解决方案能以最少的运营开销满足这些要求？",
    "options": {
      "A": "将Amazon API Gateway HTTP API与AWS Lambda函数集成，以调用Amazon Bedrock。使用Lambda响应流式传输实现响应流式传输。在Lambda函数内强制实施令牌限制。通过Lambda和API Gateway超时配置，为模型超时实现重试逻辑。",
      "B": "将Amazon API Gateway HTTP API直接连接到Amazon Bedrock。通过客户端轮询模拟流式传输。在前端强制实施令牌限制。通过API Gateway集成配置配置重试行为。",
      "C": "将Amazon API Gateway WebSocket API连接到托管容器化推理服务器的Amazon ECS服务。使用WebSocket协议实现响应流式传输。在Amazon ECS内强制实施令牌限制。通过ECS任务生命周期钩子和重启策略处理模型超时。",
      "D": "将Amazon API Gateway REST API与调用Amazon Bedrock的AWS Lambda函数集成。使用Lambda响应流式传输实现响应流式传输。在Lambda函数内强制实施令牌限制。通过Lambda和API Gateway超时配置实现重试逻辑。"
    },
    "answer": [
      "D"
    ],
    "page": 44,
    "explanation": "D 通过 API Gateway REST API 的流式代理集成，把 Lambda 返回的模型片段逐步交给客户端，同时在服务端检查令牌上限。讨论中的 A 选用 HTTP API。还应注意，设置超时只是决定何时失败，部分输出后的恢复和重试需要应用显式处理。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 104,
    "votes": {
      "D": 63,
      "A": 37
    },
    "references": [
      {
        "title": "AWS · API Gateway REST API 的流式响应",
        "url": "https://docs.aws.amazon.com/apigateway/latest/developerguide/response-transfer-mode.html"
      }
    ],
    "questionPage": 39
  },
  {
    "id": 83,
    "stem": "一家零售公司正在使用Amazon Bedrock开发客户服务AI助手。分析显示，70%的客户咨询是简单的产品问题，小型模型即可有效处理。\n而剩余30%的咨询是复杂的退换货政策问题，需要高级推理能力。该公司希望实现一个经济高效的模型选择框架，能够根据咨询复杂度自动将客户咨询路由到合适的模型。该框架必须保持较高的客户满意度，并最大限度缩短响应延迟。\n以下哪种解决方案只需最少的实施工作就能满足这些要求？",
    "options": {
      "A": "创建多阶段架构，使用小型基础模型（FM）对每个咨询的复杂度进行分类。将简单咨询路由到更经济高效的小型模型，将复杂咨询路由到能力更强的大型模型。使用AWS Lambda函数处理路由逻辑。",
      "B": "使用Amazon Bedrock智能提示路由自动分析咨询。将简单的产品咨询路由到小型模型，将复杂的退换货政策咨询路由到能力更强的大型模型。",
      "C": "实现单模型解决方案，使用采用按需定价的Amazon Bedrock中型基础模型（FM）。在模型提示中添加特殊指令，让同一个模型同时处理简单和复杂咨询。",
      "D": "为简单咨询和复杂咨询创建独立的Amazon Bedrock端点。实现基于关键字检测的规则路由系统。小型模型使用按需定价，大型模型使用预置吞吐量。"
    },
    "answer": [
      "B"
    ],
    "page": 45,
    "explanation": "大量简单产品问题可以交给较小模型，少数复杂退换货问题再交给较强模型。托管智能提示路由可根据预测的回答质量选择受支持的模型，省去维护自定义分类器的工作。实际应验证路由后不同复杂度问答的质量。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 106,
    "votes": {
      "B": 100
    },
    "questionPage": 40
  },
  {
    "id": 84,
    "stem": "一家特色咖啡公司拥有一款移动应用，该应用使用Amazon Bedrock通过三阶段提示链生成个性化咖啡烘焙档案。提示链将用户输入转换为结构化元数据，检索相关咖啡烘焙日志，并为每位客户生成个性化烘焙推荐。\n多个AWS区域的用户报告称，相同输入得到的烘焙推荐不一致，检索步骤推理速度慢，并且会出现不安全的推荐，例如建议在过高温度下冲泡。该公司必须提高重复输入输出结果的稳定性，还必须提升应用性能并保证应用输出的安全性。更新后的解决方案必须确保相同输入的输出一致性达到99.5%，推理延迟低于1秒，还必须通过经验证的安全控制阻止不安全或产生幻觉的推荐。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "部署配置了预置吞吐量的Amazon Bedrock，稳定推理延迟。应用包含语义拒绝规则的Amazon Bedrock防护栏，阻止不安全输出。使用Amazon Bedrock Prompt Management通过审批工作流管理提示。",
      "B": "使用Amazon Bedrock Agents管理提示链。将模型输入和输出记录到Amazon CloudWatch Logs。使用Amazon CloudWatch的日志对提示版本执行A/B测试。",
      "C": "在Amazon ElastiCache中缓存提示结果。使用AWS Lambda函数预处理元数据并跟踪端到端延迟。使用AWS X-Ray识别并修复性能瓶颈。",
      "D": "使用Amazon Kendra提高烘焙日志检索准确性。将标准化提示元数据存储在Amazon DynamoDB中。使用AWS Step Functions编排多步骤提示。"
    },
    "answer": [
      "A"
    ],
    "page": 45,
    "explanation": "预置吞吐量能降低高负载时的容量波动，固定提示版本有助于减少变化，护栏可拦截定义好的危险建议。若烘焙温度有明确安全上限，还要对数值做可验证的检查。99.5% 一致性与亚秒延迟均须实测。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 107,
    "votes": {
      "A": 100
    },
    "questionPage": 40
  },
  {
    "id": 85,
    "stem": "某公司正在使用Amazon Bedrock开发生成式AI（GenAI）应用。该应用将分析公司数据中的模式与关联，每天会处理分布在欧洲、北美和亚洲的多个AWS区域的数百万个新数据点，之后将数据存储到Amazon S3中。\n该应用必须符合当地数据保护和存储法规，数据驻留和处理必须在同一大洲内完成。应用还必须留存应用决策流程的审计追踪，并提供数据分类功能。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "在每个区域部署应用并配置本地IAM策略，使用Amazon Bedrock跨区域推理分配工作负载。使用Amazon CloudWatch记录AI决策流程和数据处理活动，手动跟踪各区域的合规认证。",
      "B": "结合AWS Organizations使用SCP管理特定位置的权限，使用AWS CloudTrail不可变日志审计决策流程。将自定义模型导入Amazon Bedrock，并将模型部署到每个区域。",
      "C": "对特定区域的S3存储桶策略使用Amazon S3 Object Lock。根据地理来源，在本区域内预处理数据点后再发送给Amazon Bedrock。使用Amazon Macie对数据分类，使用AWS CloudTrail不可变日志审计决策流程。",
      "D": "为每个区域创建独立AWS账户并配置单独合规框架，使用Amazon SageMaker AI搭配自定义监控跟踪模型性能和数据驻留要求合规性，为每个监管辖区生成手动报告。"
    },
    "answer": [
      "C"
    ],
    "page": 46,
    "explanation": "敏感数据在获准地理范围内预处理，并调用范围匹配的模型，Macie 用于识别 S3 中的敏感数据。Object Lock 保护保留期内的对象版本，CloudTrail 记录 API 行为。若要审计模型作出的具体判断，还需保存相应输入依据和结果。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 109,
    "votes": {
      "C": 100
    },
    "questionPage": 41
  },
  {
    "id": 86,
    "stem": "一家金融服务公司正在部署生成式AI（GenAI）应用，该应用使用Amazon Bedrock协助客户服务代表为客户提供个性化投资建议。该公司必须实施全面的治理解决方案，遵循负责任AI实践并满足监管要求。\n该解决方案必须检测并防止建议中产生幻觉。必须为客户交互提供安全控制，还必须实时监控模型行为漂移，并保留所有提示-响应对的审计轨迹，供监管审查。\n公司必须在60天内部署该解决方案，解决方案必须与公司现有的合规控制面板集成，且对客户的响应时间必须在200毫秒以内。\n哪个解决方案能在满足这些要求的同时，产生的运营开销最少？",
    "options": {
      "A": "配置Amazon Bedrock防护栏（Guardrails）以应用自定义内容过滤器和毒性检测。使用Amazon Bedrock模型评估（Model Evaluation）检测幻觉。将提示-响应对存储在Amazon DynamoDB中以捕获审计轨迹并设置TTL。将Amazon CloudWatch自定义指标与现有合规控制面板集成。",
      "B": "部署Amazon Bedrock并使用AWS PrivateLink安全访问应用程序。使用AWS Lambda函数实现自定义提示验证。将提示-响应对存储在Amazon S3存储桶中并配置S3生命周期策略。创建自定义Amazon CloudWatch控制面板来监控模型性能指标。",
      "C": "使用Amazon Bedrock Agents和Amazon Bedrock Knowledge Bases为响应提供grounding。使用Amazon Bedrock Guardrails实施内容安全管控。使用Amazon OpenSearch Service存储并索引提示-响应对。将OpenSearch Service与Amazon QuickSight集成以生成合规报告并检测模型行为漂移。",
      "D": "使用Amazon SageMaker Model Monitor检测模型行为漂移。使用AWS WAF过滤内容。将客户交互存储在加密的Amazon RDS数据库中。使用Amazon API Gateway创建自定义HTTP API，以便与合规控制面板集成。"
    },
    "answer": [
      "A"
    ],
    "page": 47,
    "explanation": "A 用护栏过滤内容，归档提示与回答，再将自定义指标接入已有合规仪表板。部分人选 C 是因为 RAG 可在生成时提供来源。Bedrock 评估作业适合对样本评分，不能直接当作每个在线请求的实时防幻觉屏障，更不能保证 200 毫秒延迟。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 110,
    "votes": {
      "A": 63,
      "C": 38
    },
    "references": [
      {
        "title": "AWS · 使用评审模型运行评估",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
      }
    ],
    "questionPage": 41
  },
  {
    "id": 87,
    "stem": "某公司使用AWS Lake Formation构建数据湖，其中包含多个AWS区域内不同业务部门的数据库和表。该公司希望通过Amazon Bedrock使用基础模型（FM）执行欺诈检测。该基础模型必须从数据湖中获取敏感财务数据，数据中包含部分客户个人可识别信息（PII）。\n该公司必须设计一个访问控制解决方案，防止个人可识别信息出现在生产环境中。基础模型只能访问经编辑去除特定数据列中敏感个人健康信息（PH）后的已授权数据子集，并且公司必须记录所有数据访问的审计追踪。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "为每个业务部门与区域的组合在单独的Amazon S3存储桶中创建单独的数据集。配置S3存储桶策略，根据分配给基础模型训练实例的IAM角色控制访问。使用S3访问日志跟踪数据访问。",
      "B": "配置基础模型使用IAM角色和基于LF-Tag表达式的Lake Formation权限进行身份验证。将业务部门和区域定义为分配给数据库和表的LF-Tag。使用AWS CloudTrail收集完整的数据访问审计追踪。",
      "C": "直接使用IAM主体授予Lake Formation中特定数据库和表的访问权限。创建自定义应用层，在将数据发送给基础模型之前记录访问请求并进一步过滤敏感列。",
      "D": "配置基础模型向AWS STS请求临时凭证。通过应用了业务部门和区域过滤的API生成的预签名S3 URL访问数据。使用AWS CloudTrail收集完整的数据访问审计追踪。"
    },
    "answer": [
      "B"
    ],
    "page": 48,
    "explanation": "用代表应用的 IAM 角色取得 Lake Formation 授予的数据权限，按业务部门、区域等 LF-Tag 管理授权范围。若只有指定列允许读取，就必须把列纳入授权或数据过滤规则。审计日志应能把访问事件关联回具体请求。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 112,
    "votes": {
      "B": 100
    },
    "questionPage": 42
  },
  {
    "id": 88,
    "stem": "某公司运行一个检索增强生成（RAG）应用，该应用使用Amazon Bedrock知识库执行合规性查询。应用使用RetrieveAndGenerateStream API。应用从包含超过50,000份法规文档、判例和政策更新的知识库中检索相关文档。\n当前RAG应用生成的响应质量不佳，因为初始检索通常返回语义相似但上下文不相关的文档。劣质响应会导致模型产生幻觉，并给出错误的法规指导。该公司需要提升RAG应用的性能，使其返回更相关的文档。\n哪个方案能以最低的运营开销满足这一需求？",
    "options": {
      "A": "部署一个Amazon SageMaker端点来运行微调后的排序模型。使用Amazon API Gateway REST API路由请求。将应用配置为通过REST API发送请求，对结果重新排序。",
      "B": "使用Amazon Comprehend对文档分类并分配相关性分数。将RAG应用的重新排序流程与Amazon Textract集成以执行文档分析。使用Amazon Neptune执行基于图的相关性计算。",
      "C": "实现一个检索流水线，使用Amazon Bedrock知识库的Retrieve API执行初始文档检索。调用Amazon Bedrock Rerank API对结果重新排序。调用InvokeModelWithResponseStream操作生成响应。",
      "D": "通过Amazon Bedrock知识库内的重新排序配置，使用最新的Amazon重排序器模型。使用该模型提升文档相关性评分，并根据上下文评估对结果重新排序。"
    },
    "answer": [
      "D"
    ],
    "page": 49,
    "explanation": "先用现有向量索引快速取回候选，再让重排序器同时审视查询与候选片段，把「措辞相似但适用法规不同」的材料往后排。知识库的托管重排可直接接入现有 RetrieveAndGenerateStream 流程。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 113,
    "votes": {
      "D": 100
    },
    "questionPage": 42
  },
  {
    "id": 89,
    "stem": "某公司正在开发一个客户沟通平台，使用由Amazon Bedrock基础模型（FM）提供支持的AI助手。该AI助手会总结客户消息并生成初始响应草稿。\n该公司希望使用Amazon Comprehend实现分层内容过滤。分层内容过滤必须阻止攻击性内容的传播，保护客户隐私，并检测潜在的不当建议招揽行为。不当建议招揽包括对不道德行为、有害活动或操纵行为的请求。该解决方案必须保持可接受的整体响应时间，因此所有预处理过滤器必须在内容到达FM之前完成处理。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "使用异步API调用进行并行处理。使用毒性检测识别攻击性内容。使用提示安全分类识别不当建议招揽。使用个人可识别信息（PII）检测，不执行脱敏。",
      "B": "使用自定义分类构建一个FM来检测攻击性内容和不当建议招揽。仅当消息通过自定义分类器后，才应用个人可识别信息（PII）检测作为二级过滤器。",
      "C": "部署多阶段流程。将流程配置为先使用提示安全分类，然后仅对安全提示执行毒性检测，最后在流模式下进行个人可识别信息（PII）检测。将标记的消息通过Amazon EventBridge路由进行人工审核。",
      "D": "对所有类别使用毒性检测，阈值配置为0.5。对提示安全分类和带实体脱敏的个人可识别信息（PII）检测使用并行处理。应用Amazon CloudWatch告警来过滤指标。"
    },
    "answer": [
      "D"
    ],
    "page": 50,
    "explanation": "D 同时做毒性检测、提示安全分类和 PII 实体脱敏，并行的检查全部通过后再调用模型。A 只标出 PII 而不去除。讨论也指出，对所有类别固定用 0.5 只是题面配置，实际上应按验证样本和误判代价分别校准。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 114,
    "votes": {
      "D": 50,
      "A": 38,
      "C": 13
    },
    "questionPage": 43
  },
  {
    "id": 90,
    "stem": "一家软件即服务（SaaS）公司正在构建一个使用Amazon SageMaker AI的推荐模型，为向客户推荐航空公司客舱升舱的应用程序提供支持。该公司将通过Amazon Bedrock自定义模型导入功能，在Amazon Bedrock上托管SageMaker AI模型。航空公司将使用该应用程序向客户发送定制化优惠。\n该模型必须分析客户的旅行历史，以提供更相关的推荐。该公司将客户旅行历史数据存储在Amazon RDS数据库中。公司必须确保该应用程序跨多家航空公司和不同客户群体交付一致、相关且准确的结果。\n以下哪种方案可以满足这些要求？",
    "options": {
      "A": "使用Amazon Bedrock知识库实现RAG架构，分析客户旅行历史数据，为应用程序提供语义搜索功能。利用语义搜索功能检索相关的预订模式、偏好和会员信息，生成个性化客舱升舱推荐。应用Amazon Bedrock防护栏过滤内容。使用AWS Step Functions和AWS Lambda函数编排验证工作流，减少幻觉。",
      "B": "实现带SQL验证的text-to-SQL转换，从RDS数据库中准确检索相关的预订模式、偏好和会员信息。使用结果生成个性化客舱升舱推荐。应用Amazon Bedrock防护栏过滤内容。使用AWS Step Functions和AWS Lambda函数编排验证工作流，减少幻觉。",
      "C": "使用Amazon OpenSearch Service实现客户旅行历史嵌入向量的向量搜索。利用向量搜索为应用程序提供基于相似度检索预订模式、偏好和会员信息的能力，生成个性化客舱升舱推荐。应用Amazon Bedrock防护栏过滤响应。使用置信度评分和语义相似度搜索减少幻觉。",
      "D": "实现带SQL验证的text-to-SQL转换，从RDS数据库中准确检索相关的预订模式、偏好和会员信息。使用结果生成个性化客舱升舱推荐。应用Amazon Bedrock防护栏过滤响应。使用置信度评分和语义相似度搜索减少幻觉。"
    },
    "answer": [
      "B"
    ],
    "page": 51,
    "explanation": "带验证的 text-to-SQL 可从关系库精确取回旅客预订和会员信息。Step Functions 把数据核对、模型生成和输出验证放进统一流程。D 也读取正确的数据源，但只依赖置信分数和语义相似度无法检查每个优惠是否满足业务规则。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 116,
    "votes": {
      "B": 60,
      "D": 40
    },
    "questionPage": 43
  },
  {
    "id": 91,
    "stem": "某公司正在使用Amazon Bedrock开发客户支持AI助手。该AI助手需要能够回答客户关于其账户的问题，且不得在回复中泄露个人信息。\n公司必须遵守数据驻留策略，确保所有处理都发生在每个客户所在的同一个AWS区域内。\n公司希望在向客户开放AI助手之前，评估该AI助手防止个人信息泄露的有效性。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "配置跨区域Amazon Bedrock防护栏来应用敏感信息过滤器。在开发和测试阶段将防护栏设置为检测模式。在生产部署时切换为拦截模式。",
      "B": "配置Amazon Bedrock防护栏来应用敏感信息过滤器。在开发和测试阶段将防护栏设置为掩码模式。在生产部署时切换为拦截模式。将防护栏的副本部署到公司运营所在的每个区域。",
      "C": "配置Amazon Bedrock防护栏来应用内容和主题过滤器。在开发、测试和生产阶段都将防护栏设置为检测模式。禁用Amazon Bedrock模型的调用日志记录。",
      "D": "配置跨区域Amazon Bedrock防护栏来应用一组内容和词过滤器。在开发和测试阶段将防护栏设置为检测模式。在生产部署时切换为掩码模式。"
    },
    "answer": [
      "B"
    ],
    "page": 52,
    "explanation": "在测试阶段先观察敏感信息掩码是否命中，再在生产针对敏感输出执行拦截。护栏与模型调用都要落在客户获准的区域内。按区域分别部署配置，也要检查实际请求路径没有启用跨区域处理。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 118,
    "votes": {
      "B": 100
    },
    "questionPage": 44
  },
  {
    "id": 92,
    "stem": "某大学近期将一批档案文档、学术期刊和手稿进行了数字化处理，将数字化文件存储在AWS Lake Formation数据湖中。\n该大学聘请了一名GenAI开发人员构建解决方案，允许用户通过文本查询搜索这些数字化文件。解决方案必须返回与用户查询语义相似的期刊摘要，用户必须能够基于文本和与期刊摘要关联的元数据搜索数字化馆藏。数字化文件的元数据不包含关键词，解决方案必须根据文本内容的相似度将相似摘要相互匹配。该数据湖包含的文件少于100万个。\n以下哪个解决方案满足这些需求，且运营开销最低？",
    "options": {
      "A": "在Amazon Bedrock中使用Amazon Titan Embeddings为数字化文件生成向量表示。将嵌入向量存储在Amazon OpenSearch Service的OpenSearch Neural插件中。",
      "B": "使用Amazon Comprehend从数字化文件中提取主题。将主题和文件元数据存储在Amazon Aurora PostgreSQL数据库中。针对Aurora数据库中的数据查询摘要元数据。",
      "C": "使用Amazon SageMaker AI部署一个sentence-transformer模型。使用该模型为数字化文件生成向量表示。将嵌入向量存储在启用了pgvector扩展的Amazon Aurora PostgreSQL数据库中。",
      "D": "在Amazon Bedrock中使用Amazon Titan Embeddings为数字化文件生成向量表示。将嵌入向量存储在启用了pgvector扩展的Amazon Aurora PostgreSQL Serverless数据库中。"
    },
    "answer": [
      "D"
    ],
    "page": 52,
    "explanation": "先给期刊摘要生成嵌入，再将向量和期刊元数据存入带 pgvector 的 Aurora PostgreSQL。查询时既能用向量找表达不同但含义相关的摘要，也能用 SQL 按期刊、年份等字段筛选，无须预先为每篇分配关键词。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 119,
    "votes": {
      "D": 100
    },
    "questionPage": 44
  },
  {
    "id": 93,
    "stem": "一家金融服务公司希望使用Amazon Bedrock基础模型（FM）分析呼叫中心通话录音。通话结束后，呼叫中心会将录音以MP3文件形式存储在Amazon S3存储桶中。公司需要在新文件创建后立即为这些录音生成结构化格式的摘要和情感分析。录音的平均大小为20 MB。\n哪组解决方案组合能够满足这些要求？（请选择两项。）",
    "options": {
      "A": "使用AWS Step Functions编排工作流来处理录音。配置步骤以调用Amazon Transcribe将音频转换为文本，验证作业完成情况，然后调用AWS Lambda函数，借助Amazon Bedrock基础模型处理文本，生成结构化分析输出。",
      "B": "使用AWS Step Functions编排工作流来处理录音。配置步骤以调用Amazon Transcribe将音频转换为文本，验证作业完成情况，然后直接调用Amazon Bedrock基础模型，以JSON格式生成摘要和情感分析。",
      "C": "使用AWS Step Functions编排工作流来处理录音。配置步骤以调用Amazon Transcribe将音频转换为文本，验证作业完成情况，然后调用AWS Lambda函数创建提示词，调用Amazon Bedrock基础模型生成结构化分析输出。",
      "D": "配置源S3存储桶，将事件发送到Amazon EventBridge。创建EventBridge规则，当存储桶中创建对象时触发Step Functions工作流。",
      "E": "配置源S3存储桶，当存储桶中创建对象时向Step Functions工作流发送通知。"
    },
    "answer": [
      "C",
      "D"
    ],
    "page": 53,
    "explanation": "S3 的新对象事件由 EventBridge 启动分析，工作流把 MP3 的位置交给 Transcribe。等待转录作业完成后，再给模型指明摘要、情感等输出字段。状态之间传对象位置即可，无须搬运整个录音文件。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 121,
    "votes": {
      "CD": 67,
      "AD": 33
    },
    "questionPage": 45
  },
  {
    "id": 94,
    "stem": "一家医疗设备公司希望将使用该公司设备的医疗操作报告输入AI助手。为保护患者隐私，AI助手必须仅向外科医生开放患者可识别个人信息（PII），必须对工程师隐藏PII，并且AI助手仅可引用生成不满3年的医疗报告。\n该公司在报告发布后立即将其存储在Amazon S3存储桶中，并且已经设置了Amazon Bedrock知识库。AI助手使用Amazon Cognito对用户进行身份验证。\n以下哪个解决方案能够满足这些要求？",
    "options": {
      "A": "在S3存储桶上启用Amazon Macie PII检测。使用S3触发器调用AWS Lambda函数，从报告中删去PII。配置Lambda函数，从存储桶中删除过期文档，并触发知识库同步。",
      "B": "当新报告上传到存储桶时，调用AWS Lambda函数同步S3存储桶与知识库。如果用户属于工程师Cognito用户组，则使用第二个Lambda函数调用Amazon Comprehend检测并删去PII。设置S3生命周期配置，从存储桶中移除超过3年的报告。",
      "C": "在存储桶上设置S3生命周期配置以移除超过3年的报告。安排AWS Lambda函数每日同步存储桶与知识库。当用户与AI助手交互时，调用与用户Cognito用户组匹配的ApplyGuardrail配置，在适当情况下从智能助手的响应中删去PII。",
      "D": "创建第二个知识库。在存储桶上设置S3生命周期配置以移除超过3年的报告。当新报告上传到存储桶时，调用AWS Lambda函数同步存储桶与原始知识库。在将存储桶同步到第二个知识库之前，使用Amazon Comprehend检测并删去PII。当用户与AI助手交互时，根据用户的Cognito用户组将模型重定向到对应的知识库。"
    },
    "answer": [
      "C"
    ],
    "page": 54,
    "explanation": "C 通过 S3 生命周期和知识库同步管理有效报告，再依据 Cognito 组决定是否在输出中遮盖 PII。D 的支持者更重视脱敏库与原始库的隔离。若严格禁止使用过期报告，每日同步仍有时间差，还应在检索时按报告日期过滤。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 123,
    "votes": {
      "C": 57,
      "D": 43
    },
    "questionPage": 45
  },
  {
    "id": 95,
    "stem": "一家大型电商公司部署了一个基础模型（FM）来生成产品描述。该公司的工程团队使用Amazon CloudWatch监控令牌使用率、延迟和错误率等技术指标。公司的营销团队在自有系统中跟踪转化率和收入影响等业务指标。\n该公司需要一个统一可观测性解决方案，将技术性能与业务成果关联起来。当运营指标表明性能下降时，该解决方案必须向利益相关者发送自动告警。该解决方案必须提供跨技术指标和业务指标的全面可见性。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "创建包含技术指标和导入业务指标的CloudWatch控制面板。配置结合技术数据和业务数据的CloudWatch复合告警。使用Amazon SNS设置给利益相关者的通知。",
      "B": "使用Amazon Managed Grafana可视化来自CloudWatch的技术指标和来自外部源的业务指标。配置Amazon Managed Grafana告警以调用AWS Lambda函数。配置Lambda函数在指标超过预定义阈值时自动修复问题。",
      "C": "使用CloudWatch Metric Streams将CloudWatch指标流式传输到Amazon S3。创建Amazon QuickSight控制面板来可视化组合后的技术指标和业务指标。当指标超过预定义阈值时，设置Amazon EventBridge规则向利益相关者发送通知。",
      "D": "配置CloudWatch自定义控制面板，整合运营指标和导入的业务指标。设置支持异常检测的CloudWatch复合告警。当关联指标表明存在性能问题时，使用Amazon SNS创建告警动作来通知利益相关者。"
    },
    "answer": [
      "D"
    ],
    "page": 55,
    "explanation": "把转化率和收入等业务指标导入 CloudWatch，和令牌、延迟、错误率放在相同时间轴上。先为单项指标设置阈值或异常检测，再让复合告警组合这些告警状态，通过 SNS 发送通知。复合告警自身不会直接给指标训练异常模型。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 125,
    "votes": {
      "D": 75,
      "A": 25
    },
    "references": [
      {
        "title": "AWS · 复合告警所能组合的条件",
        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html"
      }
    ],
    "questionPage": 46
  },
  {
    "id": 96,
    "stem": "一名生成式AI开发工程师正在评估Amazon Bedrock基础模型（FM），用于优化一家位于欧洲的企业的内部业务应用。该企业在AWS Control Tower中拥有多账户登陆区，通过服务控制策略（SCP）限制其账户仅可使用eu-north-1区域和eu-west-1区域。所有客户数据必须保留在经批准的AWS区域内的私有网络中。\n该生成式AI开发工程师经过分析和测试选择了一款基础模型，并将其部署在eu-central-1区域和eu-west-3区域。开发工程师需要为企业员工启用该基础模型的访问权限，同时确保发往基础模型的请求保持私有，且始终留在基础模型所在的同一区域内。\n以下哪种方案可以满足这些要求？",
    "options": {
      "A": "将AWS Lambda函数部署到eu-north-1的一个VPC中，通过私有Amazon API Gateway REST API对外暴露。在eu-central-1和eu-west-3为所选基础模型创建VPC端点。修改现有SCP，允许员工使用该基础模型。将REST API与业务应用集成。",
      "B": "将基础模型部署到eu-north-1的Amazon EC2实例上。在EC2实例前部署私有Amazon API Gateway REST API。配置Amazon Bedrock VPC端点。将REST API与业务应用集成。",
      "C": "将基础模型配置为通过eu.amazon.*端点进行跨区域推理，确保所有调用都保留在欧洲境内。配置Amazon Bedrock VPC端点。修改现有SCP，允许员工通过基础模型可用的欧洲区域中的推理配置文件使用该基础模型。使用推理配置文件将Amazon Bedrock与业务应用集成。",
      "D": "将基础模型部署到eu-north-1的Amazon SageMaker AI中。配置SageMaker AI VPC端点。修改现有SCP，允许员工使用SageMaker AI端点。将SageMaker AI中的基础模型与业务应用集成。"
    },
    "answer": [
      "C"
    ],
    "page": 56,
    "explanation": "私有 Bedrock VPC 端点控制流量进入服务的路径，SCP 和推理配置文件约束可选目标区域。题库选 C，但欧洲地理范围的配置文件仍可将推理路由到其他欧洲区域。如果要求每个请求始终在发起它的那个 Region，须使用该区域支持的单区域推理。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 127,
    "votes": {
      "C": 100
    },
    "references": [
      {
        "title": "AWS · 跨区域推理配置文件与目标区域",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html"
      }
    ],
    "questionPage": 46
  },
  {
    "id": 97,
    "stem": "一家医疗公司正在开发一款处理医疗查询的应用程序。该应用必须通过减少语义稀释，高精度地回答复杂查询。应用需要参考医疗文档中的特定领域术语，减少医疗术语的歧义。应用必须能够每分钟处理1000次查询，响应时间小于2秒。\n哪个解决方案能满足这些需求，且运营开销最低？",
    "options": {
      "A": "使用Amazon API Gateway将传入查询路由到Amazon Bedrock代理。配置该代理使用Anthropic Claude模型分解查询，使用Amazon Titan模型扩展查询。创建Amazon Bedrock知识库存储参考医疗文档。",
      "B": "配置Amazon Bedrock知识库存储参考医疗文档。在知识库中启用查询分解。配置使用基础模型（FM）和该知识库的Amazon Bedrock流程来支撑应用。",
      "C": "使用Amazon SageMaker AI托管自定义ML模型，同时处理查询分解和查询扩展。配置Amazon Bedrock知识库存储参考医疗文档。对知识库中的文档进行加密。",
      "D": "创建Amazon Bedrock代理编排多个AWS Lambda函数来分解查询。创建Amazon Bedrock知识库存储参考医疗文档。使用代理内置的知识库能力。为代理添加深度研究和推理能力，减少医疗术语的歧义。"
    },
    "answer": [
      "B"
    ],
    "page": 56,
    "explanation": "查询分解会把复合医疗问题拆为更具体的子问题，再分别检索权威医疗文档，减少各个子问题的术语在一次宽泛搜索中被稀释。Bedrock Flows 可编排检索和生成。额外检索也有耗时，需验证两秒目标。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 129,
    "votes": {
      "B": 100
    },
    "questionPage": 47
  },
  {
    "id": 98,
    "stem": "某企业拥有一个客户服务应用程序，该应用程序使用Amazon Bedrock生成针对客户咨询的个性化回复。企业需要建立质量保证流程，以便在版本更新过程中评估prompt有效性和模型配置。该流程必须自动比较多个prompt模板的输出，检测回复质量问题，提供量化指标，并允许人工审核人员对回复给出反馈。该流程必须阻止未满足预定义质量阈值的配置部署。\n以下哪个方案可以满足这些要求？",
    "options": {
      "A": "创建一个AWS Lambda函数，向多个Amazon Bedrock模型配置发送示例客户咨询，并将回复存储在Amazon S3中。使用Amazon QuickSight可视化回复模式。每日人工审核输出。使用AWS CodePipeline部署质量得分高于指定质量阈值的配置。",
      "B": "使用Amazon Bedrock评估作业，通过自定义prompt数据集比较模型输出。配置AWS CodePipeline在prompt模板变更时运行评估作业。配置CodePipeline仅部署质量得分高于指定质量阈值的配置。",
      "C": "设置Amazon CloudWatch警报，监控来自Amazon Bedrock的响应延迟和错误率。使用Amazon EventBridge规则在延迟和错误率指标超出阈值时通知企业。在AWS Systems Manager中配置审批工作流以执行人工质量检查。",
      "D": "使用AWS Lambda函数创建自动化测试框架，对生产流量进行采样，并将重复请求路由到更新后的模型版本。使用Amazon Comprehend情感分析比较结果。如果情感得分下降，则阻止部署。"
    },
    "answer": [
      "B"
    ],
    "page": 57,
    "explanation": "用同一批客户问题测试各提示词版本，才比较得出哪次改动让回答质量下降。B 可让 Bedrock 评估作业给出可重复的分数，再让 CodePipeline 读取结果，低于阈值就停止发布。若还要收集审核员意见，应给人工评估作业分配审核人员。仅监控延迟或情感分数会漏掉答非所问等错误。",
    "sourceLabel": "补充解析",
    "sourcePage": 130,
    "references": [
      {
        "title": "Bedrock 模型评估与评判模型",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
      },
      {
        "title": "人工评估的数据集",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-prompt-datasets-custom-human.html"
      }
    ],
    "questionPage": 47
  },
  {
    "id": 99,
    "stem": "某零售公司运营着一款应用，可在公司官网为客户提供产品推荐。该应用使用Amazon Bedrock生成推荐：动态构造提示词并将其发送给基础模型（FM）。\n一名GenAI开发人员为应用部署了一个更新，要求FM在生成提示词响应时加入一条特定的促销信息。开发人员测试应用时发现，促销信息并不总会出现在响应中；就算促销信息出现在响应里，也无法和其余文本自然衔接。\n该GenAI开发人员必须确保促销信息始终出现在FM的响应中。\n哪个方案可以满足这一要求？",
    "options": {
      "A": "在提示词上使用Amazon Bedrock Guardrails过滤器。将输入过滤强度设置为HIGH。",
      "B": "生成多个以不同方式包含促销信息的响应变体。使用重排序模型，根据与原始提示词的相关性选择最连贯的版本。",
      "C": "先将提示词发送到Amazon Bedrock运行，再通过Amazon Bedrock Agents处理响应以添加促销信息。使用原始提示词和目标信息作为上下文对结果重排序。",
      "D": "通过在发送给FM的提示词中添加输出标记，强化在产品推荐中包含新促销信息的要求。"
    },
    "answer": [
      "D"
    ],
    "page": 57,
    "explanation": "D 在生成阶段就把指定促销原文和出现位置写进输出模板，模型更容易把促销语融入推荐。过滤器处理违禁内容，重排序只能在已有候选中挑选。题目用了“始终”一词，提示词本身无法作此保证。若要求逐字出现，每次交付前还需检查原文，缺失时按固定模板插入。",
    "sourceLabel": "补充解析",
    "sourcePage": 131,
    "references": [
      {
        "title": "Bedrock 提示词模板与示例",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-templates-and-examples.html"
      }
    ],
    "questionPage": 48
  },
  {
    "id": 100,
    "stem": "某公司正在开发一款使用Amazon Bedrock基础模型（FM）的生成式AI（GenAI）应用程序。该应用程序必须使用Microsoft Entra ID进行身份验证。所有FM API调用必须保留在私有网络路径中。应用程序的访问必须按部门限制到特定模型系列。公司还需要完整的模型交互审计跟踪。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "在Microsoft Entra ID和IAM之间配置SAML联合身份认证。创建特定于部门的IAM角色，仅允许所需的ModelId值。为Amazon Bedrock运行时服务创建AWS PrivateLink接口VPC端点。启用AWS CloudTrail来捕获Amazon Bedrock API调用。配置Amazon Bedrock模型调用日志来记录详细的模型交互。",
      "B": "在IAM中创建身份提供商（IdP）连接，以通过Microsoft Entra ID进行身份验证。分配部门权限集来控制对特定模型系列的访问。在私有子网中部署AWS Lambda函数，并通过NAT网关出站访问Amazon Bedrock公共端点。启用CloudWatch Logs来捕获模型交互以进行审计。",
      "C": "在IAM中创建SAML身份提供商（IdP），以通过Microsoft Entra ID进行身份验证。使用IAM权限边界限制部门角色对特定模型系列的访问。配置带VPC路由的公共Amazon Bedrock API端点来保持私有网络连接。设置带Amazon S3生命周期规则的AWS CloudTrail来管理模型交互的审计日志。",
      "D": "在Microsoft Entra ID和IAM之间配置OpenID Connect（OIDC）联合身份认证。使用基于属性的访问控制将部门属性映射到特定模型访问权限。应用SCP策略按部门限制对Amazon Bedrock FM系列的访问。使用Microsoft Entra ID的内置日志功能来维护模型交互的审计跟踪。"
    },
    "answer": [
      "A"
    ],
    "page": 58,
    "explanation": "A 中，员工通过 Entra ID 登录后取得部门 IAM 角色，角色只获准调用指定模型，推理请求经 Bedrock Runtime 的接口 VPC 端点传送。审计要把两类记录对上，CloudTrail 追踪调用者和 API 操作，另行启用的模型调用日志记录输入和输出。仅保留登录日志会缺少模型交互内容。",
    "sourceLabel": "补充解析",
    "sourcePage": 132,
    "references": [
      {
        "title": "Bedrock 接口 VPC 端点",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/vpc-interface-endpoints.html"
      },
      {
        "title": "模型调用日志记录哪些数据",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
      },
      {
        "title": "Bedrock 的 CloudTrail 审计记录",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"
      }
    ],
    "questionPage": 48
  },
  {
    "id": 101,
    "stem": "一家医疗公司正在开发一款用于检索医学文献的AI应用程序，帮助医生开展研究。该公司希望将该应用部署到多个国家/地区。该应用需要为50,000份包含英文、法文和德文专业术语的纯文本医学文档建立索引，并且必须为医学术语提供很高的搜索准确率。该公司需要一个只需最少自定义代码开发和持续维护的解决方案。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "使用Amazon Titan Text Embeddings处理所有保持原始语言的文档，不进行翻译。在医学章节层级应用语义分块，以保留医学术语上下文并保持适中的向量维度。",
      "B": "在处理前，使用Amazon Titan Text Embeddings将所有非英文文档翻译为英文。基于逻辑段落实现文档分块策略，以提升检索准确率。",
      "C": "使用Amazon Titan Multimodal Embeddings将文档页面转换为图片。为图片生成文本标注，创建处理医学内容的多模态知识库。",
      "D": "使用Amazon Bedrock知识库作为向量存储。使用Amazon Kendra执行多语言文档处理。配置向量存储，自动处理每个查询的语言检测和翻译。"
    },
    "answer": [
      "A"
    ],
    "page": 58,
    "explanation": "医学缩写的含义常取决于所在章节。A 保留原文，并把有上下文联系的段落一起编码为向量，使同语言检索能匹配术语及其语境。Titan Text Embeddings 输出向量，B 让它承担翻译任务并不合适。Titan V2 支持法语和德语，但跨语言查询的效果仍须用实际医学检索样本验证。",
    "sourceLabel": "补充解析",
    "sourcePage": 133,
    "references": [
      {
        "title": "Titan 文本嵌入的语言支持",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html"
      }
    ],
    "questionPage": 49
  },
  {
    "id": 102,
    "stem": "一家出版公司正在开发一款聊天助手，该助手使用运行在Amazon SageMaker AI上的容器化大语言模型（LLM）。架构包含一个Amazon API Gateway REST API，用于将用户请求路由到AWS Lambda函数。Lambda函数调用托管LLM的SageMaker AI实时端点。\n用户报告响应时间不稳定。分析显示，大量聊天会话在等待首个令牌超过2秒后被放弃。该公司需要一个解决方案，确保聊天助手交互式请求的p95延迟低于800毫秒。\n以下哪种方案组合能够满足需求？（请选择两项）",
    "options": {
      "A": "在容器启动时启用模型预加载。实现动态批处理，在单次推理过程中一起处理多个用户请求。",
      "B": "为SageMaker AI端点选择更大规格的GPU实例类型。将最小实例数设置为0。继续按请求处理。在首个请求时惰性加载模型权重。",
      "C": "切换到多模型端点。使用惰性加载，不启用请求批处理。",
      "D": "将最小实例数设置为大于0。启用响应流式传输。",
      "E": "为所有请求切换到Amazon SageMaker Asynchronous Inference。将请求存储在Amazon S3存储桶中。将最小实例数设置为0。"
    },
    "answer": [
      "A",
      "D"
    ],
    "page": 59,
    "explanation": "A 让容器启动时先装入模型权重，并将同时到达的请求合批处理，避免高峰时逐个等待。D 保持至少一个热实例，生成首个令牌就向客户端返回。批处理的等待窗口和整条请求路径是否支持流式传输都会影响用户实测的 p95，800 毫秒目标要在预期并发下压测。",
    "sourceLabel": "补充解析",
    "sourcePage": 134,
    "references": [
      {
        "title": "SageMaker 推理方式",
        "url": "https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model-options.html"
      }
    ],
    "questionPage": 49
  },
  {
    "id": 103,
    "stem": "某公司运行一个生成式AI应用，该应用使用来自Amazon Bedrock的多个基础模型（FM）生成文本。应用为三个AWS区域的用户提供服务，基于AWS Lambda函数运行。\n该公司需要基于响应质量和延迟指标实现动态模型选择，并且能够在不修改或重新部署应用代码的情况下切换模型。公司希望逐步推出新模型，从20%的流量开始。此外需要一个解决方案，在错误率超过1%时自动回滚。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "使用AWS AppConfig为模型选择标准创建功能标志。设置错误率验证规则。部署AWS AppConfig Agent Lambda扩展，以便在函数运行时获取模型配置。定义线性部署策略，从20%的流量开始逐步发布新模型。",
      "B": "将模型选择配置存储在Amazon DynamoDB中。使用全局表启用多区域复制。配置Amazon EventBridge规则监控Amazon CloudWatch的错误指标，调用AWS Lambda函数更新DynamoDB表中的模型偏好设置。在Lambda函数中添加自定义代码，在每次调用模型前查询DynamoDB。",
      "C": "为每个模型配置创建Lambda函数版本。使用Lambda别名并设置路由配置，从20%的流量开始逐步在版本之间转移流量。通过AWS CodeDeploy部署监控Lambda函数版本的Amazon CloudWatch指标，当错误率超过阈值时自动回滚部署。",
      "D": "创建Amazon CloudWatch控制面板监控响应质量和延迟指标。在Lambda函数中实现自定义逻辑，基于指标阈值选择模型。使用存储在AWS Systems Manager Parameter Store中的环境变量定义模型选择参数，可跨区域更新。"
    },
    "answer": [
      "A"
    ],
    "page": 59,
    "explanation": "A 把模型选择规则放进 AppConfig，Lambda 扩展可在运行时取得配置，切换模型时无需发布新版函数。部署策略可设置为分批扩大覆盖范围。部署前验证器检查配置内容，运行中的 1% 错误率阈值则应设成关联环境的 CloudWatch 告警，用它触发回滚。",
    "sourceLabel": "补充解析",
    "sourcePage": 135,
    "references": [
      {
        "title": "AppConfig 自动回滚",
        "url": "https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html"
      },
      {
        "title": "AppConfig 部署策略",
        "url": "https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html"
      }
    ],
    "questionPage": 50
  },
  {
    "id": 104,
    "stem": "某金融服务公司正在开发一款人工智能驱动的搜索助手应用，帮助投资顾问快速检索投资数据。该应用以AWS Lambda函数的形式运行。\n公司使用Amazon Bedrock开发应用，依托的Amazon Bedrock知识库采用Amazon OpenSearch Serverless作为数据源。应用代理必须大规模管理集合，自动为匹配特定模式的集合和索引分配访问权限。\n该公司使用Amazon Bedrock工具测试知识库。知识库同步流程成功完成。但测试显示，当测试尝试访问OpenSearch Serverless时，BedrockAgentRuntime API返回400错误授权错误，同时返回403禁止访问错误。该公司必须解决权限问题。\n哪组解决方案组合能够满足要求？（请选择两项）",
    "options": {
      "A": "更新Lambda函数执行角色，使其包含bedrock:InvokeAgent权限。向Lambda执行角色添加aoss:APIAccessAll权限。",
      "B": "创建包含基于模式的资源规则的OpenSearch Serverless数据访问策略。",
      "C": "为OpenSearch Serverless配置VPC端点策略。将端点添加到Lambda函数的VPC配置中。",
      "D": "配置AWS Secrets Manager来存储OpenSearch Serverless凭证。授予Lambda函数检索凭证的访问权限。",
      "E": "为OpenSearch Serverless域启用IAM身份验证。向Lambda函数执行角色添加es:ESHttp*权限。"
    },
    "answer": [
      "A",
      "B"
    ],
    "page": 60,
    "explanation": "A、B 对应两层授权。调用方需要相应的 Bedrock 操作权限，实际访问集合的角色还需要 aoss:APIAccessAll。OpenSearch Serverless 数据访问策略再用通配规则授予该角色对匹配集合和索引的权限。若由知识库服务角色查询向量库，就应检查该角色的授权。单改 Lambda 角色可能仍返回 403。",
    "sourceLabel": "补充解析",
    "sourcePage": 136,
    "references": [
      {
        "title": "OpenSearch Serverless 数据访问策略",
        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-data-access.html"
      },
      {
        "title": "知识库服务角色与向量存储权限",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-create-security.html"
      }
    ],
    "questionPage": 50
  },
  {
    "id": 105,
    "stem": "一家金融服务公司正在开发一款生成式AI应用，允许业务分析师通过自然语言查询敏感客户数据。生成式AI开发人员必须实施一个内容安全框架，该框架可执行文本转SQL转换，同时防止有害输出。该解决方案必须检测并阻止自然语言提示中的SQL注入尝试，根据预定义架构验证生成的SQL查询，并创建查询转换的审计追踪。\n以下哪个解决方案能够满足这些要求？",
    "options": {
      "A": "使用集成了内容过滤系统的Amazon Bedrock。部署带有自定义SQL威胁检测规则的Amazon GuardDuty。使用AWS Lambda函数，根据AWS Systems Manager Parameter Store中的架构定义检查生成的查询。使用Amazon EventBridge将所有转换的记录存储在Amazon S3中。",
      "B": "实施使用Amazon Bedrock Guardrails过滤输入的多阶段验证流水线。配置AWS Lambda函数配合SQL解析库来验证查询语法。使用Amazon RDS Data API根据定义的架构验证查询，并在流水线运行每个查询之前收集审计日志。",
      "C": "配置AWS CloudTrail记录所有数据库API调用。实施拥有最小权限访问应用程序的IAM角色。使用AWS WAF过滤发往应用程序的恶意输入。",
      "D": "训练自定义Amazon SageMaker AI模型来安全地将文本转换为SQL。附加VPC端点隔离客户数据数据库。将查询历史存储在Amazon DynamoDB中。"
    },
    "answer": [
      "B"
    ],
    "page": 60,
    "explanation": "B 在三个位置把关，先筛查用户输入，再解析生成的 SQL 并核对允许访问的表、列和读操作，最后记录审核结果才执行。Guardrails 有助于识别提示词攻击，SQL 解析和权限约束仍由应用承担。RDS Data API 的 ExecuteStatement 会实际执行语句，因此应在调用以前完成校验。",
    "sourceLabel": "补充解析",
    "sourcePage": 137,
    "references": [
      {
        "title": "Guardrails 提示词攻击检测",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html"
      },
      {
        "title": "RDS Data API 执行 SQL 的行为",
        "url": "https://docs.aws.amazon.com/rdsdataservice/latest/APIReference/API_ExecuteStatement.html"
      }
    ],
    "questionPage": 51
  },
  {
    "id": 106,
    "stem": "某公司需要一个系统能够从多个内容源自动生成学习材料。内容源包括文档文件（PDF文件、PowerPoint演示文稿和Word文档）以及多媒体文件（录制视频）。该系统每天必须处理超过10,000个内容源，峰值负载为500次并发上传。系统还必须从文档文件和多媒体文件中提取关键概念，并创建和存储符合上下文语境的准确摘要。生成的学习材料必须支持带有版本控制的实时协作。\n哪个方案能够满足这些要求？",
    "options": {
      "A": "使用Amazon Bedrock Data Automation (BDA) 结合AWS Lambda函数编排文档文件处理流程。使用Amazon Bedrock Knowledge Bases处理所有多媒体内容。将内容存储在启用了复制的Amazon DocumentDB中。通过Amazon SNS主题订阅实现协作。使用Amazon Bedrock Agents跟踪变更。",
      "B": "使用Amazon Bedrock Data Automation (BDA) 结合基础模型（FM）处理文档文件。将BDA与Amazon Textract集成以提取PDF内容，与Amazon Transcribe集成以处理多媒体文件。将处理后的内容存储在启用了版本控制的Amazon S3中。将元数据存储在Amazon DynamoDB中，结合AWS AppSync GraphQL订阅实现实时协作。",
      "C": "使用Amazon Bedrock Data Automation (BDA) 结合Amazon SageMaker AI端点托管内容提取和摘要模型。使用Amazon Bedrock Guardrails从所有文件类型中提取内容。将文档文件存储在Amazon Neptune中用于时间序列分析。通过Amazon Bedrock Chat实现实时消息协作。",
      "D": "使用Amazon Bedrock Data Automation (BDA) 结合AWS Lambda函数批量处理内容文件。在Amazon Bedrock中微调基础模型（FM）以对所有内容类型的文档进行分类。将处理后的数据存储在启用分片集群模式的Amazon ElastiCache (Redis OSS) 中。使用Amazon Bedrock Prompt Management进行版本控制。"
    },
    "answer": [
      "B"
    ],
    "page": 61,
    "explanation": "B 把三件事分别落实，从文档和视频提取可供摘要的内容，S3 版本控制保存每次修订，AppSync 订阅把更新推给协作者。S3 版本控制本身不会通知正在编辑的客户端。实际接入时，BDA 异步文档格式列表不含 PPTX，演示文稿需先转成受支持格式，再按服务配额消化高峰上传。",
    "sourceLabel": "补充解析",
    "sourcePage": 138,
    "references": [
      {
        "title": "BDA 支持的文件格式和处理限制",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/bda-limits.html"
      },
      {
        "title": "AppSync 实时订阅",
        "url": "https://docs.aws.amazon.com/appsync/latest/devguide/aws-appsync-real-time-data.html"
      }
    ],
    "questionPage": 51
  },
  {
    "id": 107,
    "stem": "一家医疗公司希望开发一个概念验证应用程序，使用Amazon Bedrock自动汇总医疗文档。该公司有3周时间来验证应用程序的准确性。应用程序必须符合公司的数据隐私政策，还必须包含评估汇总准确性和处理时间的指标。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "创建一个包含50-100份匿名患者记录的数据集。使用安全知识库实现检索增强生成（Retrieval Augmented Generation, RAG）。使用评测模型在三个基础模型（FM）之间评估准确性指标。",
      "B": "在患者记录上微调单个基础模型（FM）。将该FM部署到Amazon Bedrock。使用Amazon Bedrock AgentCore将FM配置为智能代理。对500名公司员工开展用户测试。",
      "C": "选择可用的性能最强的AWS基础模型（FM）。使用Converse APIs创建聊天界面。仅使用利益相关者的定性反馈，在50-100份真实患者记录上测试应用程序。使用自定义Web界面收集真实性能指标。",
      "D": "使用Strands SDK部署多个连接到多个知识库的智能代理，这些知识库包含专业医疗文档。对比不同代理的响应。评估代理与公司现有系统的集成效果。"
    },
    "answer": [
      "A"
    ],
    "page": 61,
    "explanation": "三周概念验证重在做出可比较的测量。A 用相同的匿名病例和受控资料测试三个模型，适合用参考摘要检查遗漏或错误。除评估准确性外，还要为每次请求记录开始、完成时间，才能交付题目要求的处理时长指标。先微调或搭建多智能体会占用这段验证时间。",
    "sourceLabel": "补充解析",
    "sourcePage": 139,
    "references": [
      {
        "title": "Bedrock 模型评估指标",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html"
      },
      {
        "title": "评估数据集格式与参考回答",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-prompt-datasets-judge.html"
      }
    ],
    "questionPage": 52
  },
  {
    "id": 108,
    "stem": "某公司希望为其AI助手选型一款新的基础模型（FM）。生成式AI开发人员需要生成评估报告，帮助数据科学家评估各类基础模型（FM）的质量与安全性。数据科学家为生成式AI开发人员提供了用于评估的示例prompt。生成式AI开发人员希望使用Amazon Bedrock自动化生成报告并完成评估。\n哪个方案能够满足该需求？",
    "options": {
      "A": "将所有示例prompt合并为单个JSON文档。使用该文档创建Amazon Bedrock知识库。编写prompt要求FM对每个示例prompt生成响应。使用RetrieveAndGenerate API为每个模型生成报告。",
      "B": "将所有示例prompt合并为单个JSONL文档。将文档存储在Amazon S3存储桶中。创建一个使用评判模型（judge model）的Amazon Bedrock评估任务。将S3位置指定为输入，另一个不同的S3位置指定为输出。为每个FM运行评估任务，并将该FM指定为生成器。",
      "C": "将所有示例prompt合并为单个JSONL文档。将文档存储在Amazon S3存储桶中。创建一个使用评判模型（judge model）的Amazon Bedrock评估任务。将S3位置指定为输入，Amazon Quick Sight指定为输出。为每个FM运行评估任务，并将该FM指定为评估器。",
      "D": "将所有示例prompt合并为单个JSON文档。基于该文档创建Amazon Bedrock知识库。创建一个使用检索和响应生成评估类型的Amazon Bedrock评估任务。指定Amazon S3存储桶作为输出。为每个FM运行评估任务。"
    },
    "answer": [
      "B"
    ],
    "page": 62,
    "explanation": "B 把每条测试提示写成独立的 JSONL 记录，让每个候选模型在相同输入下生成回答。评判模型按统一的质量、安全标准评分，结果写入指定的 S3 输出位置。候选模型应担任生成器。把它们轮流当评判者会同时改变评分尺度，使报告难以比较。",
    "sourceLabel": "补充解析",
    "sourcePage": 140,
    "references": [
      {
        "title": "评估数据集格式与参考回答",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-prompt-datasets-judge.html"
      },
      {
        "title": "Bedrock 模型评估与评判模型",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
      }
    ],
    "questionPage": 52
  },
  {
    "id": 109,
    "stem": "某金融服务公司正在开发一个自然语言处理（NLP）应用程序，该程序使用AWS Lambda函数通过Amazon Bedrock基础模型（FM）处理客户交易查询。Lambda函数必须生成全面的交易分析响应，这些响应的大小通常超过4 MB，且需要15-20秒才能完成处理。应用程序必须在10秒内响应客户查询，并且需要符合金融监管要求，将记录保留10年。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "实现响应流式传输，以便在应用程序生成响应时显示部分响应。将Lambda函数执行超时时间设置为15秒。启用AWS X-Ray追踪以监控性能。",
      "B": "使用Amazon SQS队列实现异步调用。将Lambda函数执行超时时间设置为30秒。使用Amazon CloudWatch监控响应时间。",
      "C": "使用Amazon API Gateway轮询应用程序。将应用程序与Amazon ElastiCache集成以缓存响应。将Lambda函数执行超时时间设置为30秒。收集详细的Amazon CloudWatch日志以监控应用程序性能。",
      "D": "实现响应流式传输，以便在应用程序生成响应时显示部分响应。将Lambda函数执行超时时间设置为30秒。将完整的响应记录存储在Amazon S3中。"
    },
    "answer": [
      "D"
    ],
    "page": 62,
    "explanation": "D 通过流式传输先展示已生成片段，使用户有机会在 10 秒内看到首段，余下分析可继续到 15–20 秒。30 秒超时覆盖题设处理时间，完整响应再写入 S3。要兑现十年留存，应配置相应保留策略。若要求期间禁止删除，可对对象版本配置十年的 Object Lock 保留期。",
    "sourceLabel": "补充解析",
    "sourcePage": 141,
    "references": [
      {
        "title": "Lambda 响应流",
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/configuration-response-streaming.html"
      },
      {
        "title": "S3 Object Lock 保留期",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock-configure.html"
      }
    ],
    "questionPage": 53
  },
  {
    "id": 110,
    "stem": "某大学正在构建一个包含多个子应用的AI驱动应用程序。这些子应用包括AI助手、作业评分器和内部分析应用。该大学目前正在使用多个基础模型（FM）定义和测试多个提示词。大学希望对比每个提示词的不同变体，选出能够生成最符合特定用例需求输出的变体。\n该大学需要一个提示词版本控制解决方案，要求能够测试不同提示词变体，并收集提示词变更和使用情况的审计追踪。该解决方案还必须保持一致性，同时允许提示词集成到主应用程序中。\n以下哪组解决方案能够满足这些需求，同时带来最少的运营开销？（请选择两项。）",
    "options": {
      "A": "使用Amazon Bedrock 提示词管理创建带版本的提示词，为每个用例添加参数化变量。",
      "B": "将提示词存储在Amazon S3 中，使用AWS Step Functions 编排模型交互和服务集成。",
      "C": "使用Amazon Bedrock Flows 创建整合基础模型和AWS 服务的工作流。",
      "D": "配置AWS Config 记录提示词变更，使用AWS CloudTrail 追踪提示词使用情况。",
      "E": "配置Amazon Bedrock 智能提示路由。"
    },
    "answer": [
      "A",
      "C"
    ],
    "page": 63,
    "explanation": "A 用参数化变量复用模板，也能保存经过比较的提示词版本。C 让主应用通过 Flows 的提示词节点调用所选版本，避免多个子应用各自复制文本。要追查谁改了提示词、应用何时调用，应覆盖相应的 CloudTrail 管理或数据事件，并在调用记录中关联实际使用的版本。",
    "sourceLabel": "补充解析",
    "sourcePage": 142,
    "references": [
      {
        "title": "发布并使用提示词版本",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-deploy.html"
      },
      {
        "title": "Bedrock Flows 节点",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html"
      },
      {
        "title": "Bedrock 的 CloudTrail 审计记录",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/logging-using-cloudtrail.html"
      }
    ],
    "questionPage": 53
  },
  {
    "id": 111,
    "stem": "一家公司正在构建一个多云生成式AI（GenAI）驱动的密钥解析应用，该应用使用Amazon Bedrock和Agent Squad。应用可从多个来源解析密钥，包括密钥存储库和硬件安全模块（HSM）。该应用使用AWS Lambda函数从来源检索密钥，使用AWS AppConfig实现动态功能闸门，支持密钥链式解析并检测密钥漂移，可处理短生命周期和即将过期的密钥，还支持针对模板化指令的提示流，使用AWS Step Functions编排代理来解析密钥，并管理密钥验证和漂移检测。\n该公司在应用测试期间发现了多个问题：应用无法及时刷新过期密钥供代理使用；应用会发送密钥漂移警报，但代理仍在使用stale 数据；应用内的提示流会重复使用过时模板，从而引发级联故障。公司必须解决这些性能问题。\n哪种方案可以满足该需求？",
    "options": {
      "A": "使用Step Functions Map状态并行运行代理工作流，通过Lambda函数输出传递更新后的密钥元数据，使用AWS AppConfig为所有提示流创建版本，以管控和回滚有故障的模板。",
      "B": "仅使用Amazon Bedrock AgentCore，配置Amazon Bedrock护栏来限制提示变异，对单个代理的工作流定义使用内联JSON schema来链式串联工具调用。",
      "C": "使用集中式Amazon EventBridge管道调用每个事件代理，将中间提示存储在Amazon DynamoDB中，通过基于TTL的退避和重试解决代理排序问题。",
      "D": "使用Amazon EventBridge Pipes根据Amazon CloudWatch日志模式调用解析器，将响应元数据存储在Amazon DynamoDB中，配置TTL和版本化写入，使用Amazon Q Developer动态生成回退提示，并通过Lambda协调器进行路由。"
    },
    "answer": [
      "A"
    ],
    "page": 63,
    "explanation": "A 用 Map 并行处理彼此独立的解析任务，再把 Lambda 返回的新版本和有效期传给依赖它们的后续步骤。这样漂移告警触发刷新后，后续代理能使用新引用。AppConfig 给提示词模板保留可回滚版本。仅设置 TTL 或重试次数无法自动更新已在运行的工作流输入。",
    "sourceLabel": "补充解析",
    "sourcePage": 143,
    "references": [
      {
        "title": "Step Functions 的 Map 状态",
        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/state-map.html"
      },
      {
        "title": "AppConfig 自动回滚",
        "url": "https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html"
      }
    ],
    "questionPage": 54
  },
  {
    "id": 112,
    "stem": "一家金融服务公司每天通过使用Amazon Bedrock AgentCore的多智能体生成式AI应用处理超过10,000条客户咨询。应用智能体调用多个自定义工具。在高峰使用时段，用户反馈自定义工具的失败率高达40%。这些工具在公司不同团队中的运行表现不一致。\n一名生成式AI开发人员必须实施可观测性解决方案，提供对智能体交互和工具行为的端到端可见性。该解决方案必须使用Amazon Bedrock的内置功能，且不需要自定义instrumentation。该开发人员需要一个性能开销极低的解决方案。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "启用AgentCore可观测性与追踪采集。使用AWS X-Ray捕获自定义工具的分布式追踪。构建Amazon CloudWatch控制面板，可视化高峰时段错误、限流和延迟指标。",
      "B": "使用Amazon CloudWatch Container Insights监控智能体。配置一个AWS Lambda函数轮询Amazon Bedrock API获取工具使用指标。配置该函数将结果存储在CloudWatch中以生成告警。",
      "C": "构建自定义ETL管道，使用AWS Lambda函数处理来自Amazon Bedrock的Amazon CloudWatch日志。将处理后的数据存储在Amazon DynamoDB中。使用Amazon Quick Sight可视化跨团队性能模式。",
      "D": "启用AgentCore可观测性并将追踪数据发送到Amazon CloudWatch Logs。使用自定义AWS Lambda函数从日志中提取工具性能指标。使用Amazon Managed Grafana可视化趋势。"
    },
    "answer": [
      "A"
    ],
    "page": 64,
    "explanation": "A 把一次客户请求中的代理调用和工具调用放入同一追踪链，可以对照出错时的工具、耗时和限流情况，再用 CloudWatch 查看高峰趋势。支持的框架可用自动采集减少手写埋点。需要追踪到自定义工具内部时，还应确认该工具的运行环境传播追踪上下文并发送相应的 span。",
    "sourceLabel": "补充解析",
    "sourcePage": 144,
    "references": [
      {
        "title": "AgentCore 可观测性配置",
        "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/observability-configure.html"
      },
      {
        "title": "AgentCore 与 X-Ray 追踪",
        "url": "https://docs.aws.amazon.com/xray/latest/devguide/xray-services-agentcore.html"
      }
    ],
    "questionPage": 54
  },
  {
    "id": 113,
    "stem": "一家电商公司正在Amazon Bedrock中使用Anthropic Claude Sonnet模型生成产品推荐。一个AWS Lambda函数从Amazon DynamoDB获取客户购买数据，从Amazon S3获取产品评论，从Amazon RDS获取客户配置文件信息。随后该函数通过API调用直接将数据发送给Amazon Bedrock模型。最近，拥有大量购买历史的客户开始收到不完整的推荐。\nLambda函数的Amazon CloudWatch日志显示执行超时。Amazon Bedrock API调用的CloudWatch日志显示间歇性错误。该公司查看日志后发现，部分请求因上下文长度超出错误而失败。其他请求虽然完成，但似乎忽略了部分输入数据。\n该公司希望推荐系统在生成推荐时考虑所有客户数据，并希望使用Amazon Bedrock知识库改进数据组织和检索。\n哪种解决方案组合可以满足这些需求？（请选两项）",
    "options": {
      "A": "实施分块策略，将客户数据划分为更小的片段。配置模型单独处理每个片段。最后一次调用模型，将各个响应合成为全面的推荐。",
      "B": "修改提示词结构，将最关键的信息放在上下文窗口的开头和结尾。实现令牌计数逻辑，当交互接近模型的最大上下文长度时截断不重要的数据。",
      "C": "将Claude Sonnet替换为具有更大上下文窗口容量的模型。增加Lambda函数超时时间，以适应更大输入的更长处理时间。",
      "D": "配置推荐系统使用Converse API。修改additionalModelRequestFields参数，将最大令牌限制提高到超出模型默认上下文窗口大小。",
      "E": "通过使用知识库对客户数据建立向量嵌入索引来实施RAG。根据当前客户上下文，仅检索每个推荐请求中语义最相关的信息。"
    },
    "answer": [
      "A",
      "E"
    ],
    "page": 64,
    "explanation": "A 把长历史切成可处理的片段，逐段提取信息，再合并中间结果，避免输入超长或直接截掉早期购买记录。E 让知识库按当前推荐目标找出相关细节补充依据。向量检索一次只取部分片段。如果业务要求审阅全部历史，就要由 A 的逐段处理覆盖每一块。",
    "sourceLabel": "补充解析",
    "sourcePage": 145,
    "references": [
      {
        "title": "Bedrock 知识库的检索流程",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-retrieval.html"
      }
    ],
    "questionPage": 55
  },
  {
    "id": 114,
    "stem": "某公司使用Amazon Bedrock开发了一个多模态内容分析应用程序。该应用程序会将不同内容类型（文本、图像和代码）路由到专门的基础模型（FM）。\n该应用程序需要处理多种类型的路由决策：基于文件扩展名的简单路由必须实现最低延迟；基于内容语义的复杂路由需要在选择FM之前进行分析。该应用程序必须提供详细历史记录，并在主FM发生故障时支持回退选项。\n以下哪种解决方案可以满足这些要求？",
    "options": {
      "A": "配置AWS Lambda函数来调用Amazon Bedrock FM处理所有路由逻辑。使用条件语句根据内容类型和语义确定合适的FM。",
      "B": "创建一个混合解决方案。在应用程序代码中处理基于文件扩展名的简单路由。使用带有JSONata进行内容分析的AWS Step Functions状态机，以及针对专门FM的InvokeModel API来处理基于内容的复杂路由。",
      "C": "为每种内容类型部署单独的AWS Step Functions工作流，将路由逻辑放在AWS Lambda函数中。当需要回退到备用FM时，使用Amazon EventBridge协调不同工作流之间的操作。",
      "D": "对每种内容类型使用不同的Amazon SQS队列。配置AWS Lambda消费者分析内容，并通过AWS SDK调用Amazon Bedrock，根据消息属性调用合适的FM。"
    },
    "answer": [
      "B"
    ],
    "page": 65,
    "explanation": "B 把一眼就能从扩展名确定的请求留在本地分支，省去一次远程调用。需要理解语义时，工作流可先调用模型分析内容，再由 JSONata 读取分类结果、选择目标模型。标准工作流保留执行历史，失败时用 Catch 转入备用模型。JSONata 自身负责数据转换和条件判断。",
    "sourceLabel": "补充解析",
    "sourcePage": 146,
    "references": [
      {
        "title": "Step Functions 用 JSONata 转换数据",
        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/transforming-data.html"
      },
      {
        "title": "Step Functions 错误处理",
        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"
      }
    ],
    "questionPage": 55
  },
  {
    "id": 115,
    "stem": "某公司正在开发一款使用Amazon Bedrock基础模型（FM）的客户支持聊天助手。该公司希望更新到更新的FM版本，但需要实现一个验证系统来检测响应中的语义漂移。公司希望确保终端用户的性能和功能保持一致。\n该公司需要一个解决方案，针对500个测试用例比较当前FM版本和新版本FM的响应。该解决方案必须检测响应含义的变化，生成定量相似度分数，完成验证，并记录详细结果供历史比较。",
    "options": {
      "A": "配置Amazon CloudWatch Synthetics canary，使用自定义JavaScript代码向新版本和现有版本FM发送相同的prompt。将响应存储在Amazon S3中。通过人工审查识别不同FM版本之间的语义差异。",
      "B": "配置AWS Step Functions工作流，向新版本和现有版本FM发送测试prompt。使用Amazon Bedrock嵌入模型计算余弦相似度分数。将结果存储在使用复合键架构的Amazon DynamoDB中。",
      "C": "使用Amazon Bedrock模型评估作业，针对500个测试用例将新版本FM与当前版本进行比较。配置评估以计算语义相似度指标。将结果存储在Amazon S3中，用于历史比较。",
      "D": "使用Amazon SageMaker AI构建自定义解决方案，在历史响应上训练分类器模型，以便在解决方案将新版本FM的响应与历史模式进行比较时检测异常。"
    },
    "answer": [
      "C"
    ],
    "page": 66,
    "explanation": "C 可将旧版本对这 500 个案例的输出作为参考，与新回答逐项配对，在 S3 保留分数和明细。要检验“换了说法，含义是否仍相同”，可定义比较参考回答与新回答的自定义评分尺度。B 的向量余弦分数也是可行思路，但需另建编排和结果存储，且高分仍可能掩盖否定词等关键变化。",
    "sourceLabel": "补充解析",
    "sourcePage": 147,
    "references": [
      {
        "title": "评估数据集格式与参考回答",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-prompt-datasets-judge.html"
      },
      {
        "title": "以参考回答定义自定义评分指标",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-custom-metrics-prompt-formats.html"
      }
    ],
    "questionPage": 56
  },
  {
    "id": 116,
    "stem": "一家媒体公司正在使用Amazon Bedrock 构建一个AI驱动的内容审核系统。该系统首先使用一个小型低延迟模型对文本进行分类，然后将置信度分数低于0.65的请求升级到更大、成本更高的模型处理。\n该系统必须对高置信度结果提供近实时响应，必须异步处理低置信度请求，必须能够弹性扩展以应对需求突发峰值。公司希望仅在需要时才调用大模型，从而优化系统成本，并且希望使用解耦组件来实现系统的高弹性。\n哪种解决方案能够满足这些要求？",
    "options": {
      "A": "使用Amazon API Gateway 同步调用小型模型。如果小型模型的置信度分数低于0.65，则同步调用大型模型。使用预配置并发处理流量峰值。",
      "B": "使用包含并行分支的AWS Step Functions 工作流，对每个请求同时运行小型模型和大型模型。当置信度分数不同时，选择大型模型的结果。",
      "C": "将请求发送到Amazon SQS 队列。使用AWS Fargate 处理消息。首先调用小型模型。如果置信度分数低于0.65，则将请求放入第二个SQS 队列，由大型模型异步处理。",
      "D": "将两个模型都部署在Amazon EC2 实例上并启用自动扩缩容。使用自定义应用启发式算法，基于短语长度和关键词规则将请求路由到适当的实例。"
    },
    "answer": [
      "C"
    ],
    "page": 66,
    "explanation": "C 把成本最高的一步放到第二个队列。小模型处理完就能交付置信度达到 0.65 的结果，只有低于阈值的请求才交给大模型。两个队列可分别缓冲突发流量、调整消费者数量。A 会让低置信度请求一直等待，B 则为每个请求支付两次推理费用。首个队列也有等待时间，近实时响应还取决于消费者容量和结果回传。",
    "sourceLabel": "补充解析",
    "sourcePage": 148,
    "references": [
      {
        "title": "Amazon SQS 消息队列",
        "url": "https://docs.aws.amazon.com/AWSSimpleQueueService/latest/APIReference/"
      }
    ],
    "questionPage": 56
  },
  {
    "id": 117,
    "stem": "一家社交消息公司正在使用Amazon Bedrock构建AI聊天助手。该公司必须确保每次推理都符合已批准的安全策略。公司希望在模型调用之前阻止有害提示，实时过滤流式模型输出，并将标记的案例路由给人工审核。\n哪个解决方案能够满足这些要求？",
    "options": {
      "A": "配置一个AWS Step Functions工作流。配置一个步骤，使用AWS Lambda函数通过ApplyGuardrail API预先检查输入。使用附加了guardrail的InvokeModelWithResponseStream API步骤。配置第二个Lambda函数步骤，通过ApplyGuardrail API事后检查输出。将标记的条目路由到Amazon SQS队列。使用bedrock:GuardrailIdentifier IAM条件强制实施guardrail使用要求。",
      "B": "配置一个AWS Step Functions工作流。配置一个步骤，在推理之前调用ApplyGuardrail API。然后调用不带流式的InvokeModel API并使用guardrail。将结果存储在Amazon S3中。通过客户端UI隐藏有问题的令牌。",
      "C": "配置一个AWS Step Functions工作流。配置一个步骤，使用附加了guardrail的InvokeModelWithResponseStream API进行流内过滤。运行一个AWS Lambda事后检查步骤，通过ApplyGuardrail API检查标记的案例。不执行推理前检查。",
      "D": "配置一个AWS Step Functions工作流，其中包含使用ApplyGuardrail API和InvokeModelWithResponseStream API执行预检查和事后检查的步骤。将guardrail附加到检查步骤。使用代码评审等流程控制，而非IAM强制实施，来确保始终应用guardrail。"
    },
    "answer": [
      "A"
    ],
    "page": 67,
    "explanation": "A 在推理前用 ApplyGuardrail 检查输入，推理时携带已批准的护栏，命中策略的记录进入 SQS 供人工审核。流式输出应采用同步检查，让每批文本通过过滤后再发送。IAM 条件 bedrock:GuardrailIdentifier 可拒绝缺少指定护栏的调用。C 缺了推理前检查，D 依靠代码评审，调用者仍可能漏传护栏。",
    "sourceLabel": "补充解析",
    "sourcePage": 149,
    "references": [
      {
        "title": "流式响应的护栏检查模式",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-streaming.html"
      },
      {
        "title": "用 IAM 强制使用指定护栏",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html"
      }
    ],
    "questionPage": 57
  },
  {
    "id": 118,
    "stem": "某金融服务公司使用Amazon Bedrock分析存储在Amazon S3存储桶中的客户数据。数据包含个人可识别信息（PII）。该公司必须对基础模型（FM）响应中的PII进行掩码处理。\n哪个解决方案能够以最少的运维工作量满足此要求？",
    "options": {
      "A": "在Amazon Bedrock中创建护栏以过滤PII内容。定义PII类型并将护栏操作设置为MASK。配置Amazon Bedrock对每个FM响应应用该过滤器。",
      "B": "在调用Amazon Bedrock之前，使用Amazon Comprehend检测S3数据中的PII实体。配置一个AWS Lambda函数调用Amazon Comprehend DetectPiiEntities API对检测到的PII进行掩码处理。将处理后的数据存回原始S3存储桶。",
      "C": "使用Amazon Macie扫描S3存储桶中的PII数据。配置一个AWS Lambda函数将PII存储到第二个S3存储桶中。使用Amazon EventBridge规则调用该Lambda函数。",
      "D": "配置一个AWS Lambda函数搜索PII数据。在Lambda函数代码中实现一个步骤，将PII存储到第二个S3存储桶，将非PII数据存储到第三个S3存储桶。"
    },
    "answer": [
      "A"
    ],
    "page": 67,
    "explanation": "A 将敏感信息过滤器应用到每次生成的输出。即使模型从上下文重新写出了姓名或账号，返回给用户的文本也会按配置替换检测到的实体。B、C、D 处理的是 S3 中的数据，无法覆盖新生成的内容。选项里的 MASK 表示掩码效果，Bedrock API 对应的操作值是 ANONYMIZE。",
    "sourceLabel": "补充解析",
    "sourcePage": 150,
    "references": [
      {
        "title": "敏感信息过滤器的操作值",
        "url": "https://docs.aws.amazon.com/bedrock/latest/APIReference/API_GuardrailPiiEntityConfig.html"
      },
      {
        "title": "Bedrock 敏感信息过滤器",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
      }
    ],
    "questionPage": 57
  },
  {
    "id": 119,
    "stem": "一家医疗公司正在Amazon Bedrock上部署一个临床知识库应用程序，为医生提供医疗信息。在测试过程中，质量团队发现生成式AI（GenAI）模型偶尔会编造并非来自已批准临床指南的治疗建议。\n质量团队需要实施一个解决方案，在发布应用程序之前检测幻觉。该解决方案必须根据已验证的医疗信息分析模型响应，并且必须在用户以不同方式提出类似问题时识别语义不一致。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "部署一个实时监控系统，使用Amazon CloudWatch Logs Insights分析响应模式，并根据预定义关键词标记事实错误。部署AWS Lambda函数，将响应与Amazon DynamoDB表中的已知答案进行比较。",
      "B": "创建一个包含来自临床指南的已验证问答对的参考数据集。使用Amazon Bedrock Guardrails实施输出差异分析，以进行响应一致性检查。使用Amazon Bedrock评估检测事实错误。",
      "C": "为Amazon Bedrock Guardrails配置自定义规则，通过识别GenAI响应中的特定模式来检测和阻止可能存在幻觉的内容。使用Amazon SageMaker Feature Store维护已验证临床指南的存储库。",
      "D": "使用自定义提示数据集创建Amazon Bedrock自动模型评估作业。设置异常检测告警以识别事实错误。当检测到错误时实施Amazon SNS通知。"
    },
    "answer": [
      "B"
    ],
    "page": 68,
    "explanation": "B 以已验证的临床问答作为基准。可把同一问题改写成多种问法，逐条检查回答中的主张是否有获批指南支持，再比较这组回答是否给出矛盾结论。关键词告警容易漏掉措辞不同的错误。选项所说的“输出差异分析”需要在评估流程中实现，Guardrails 的上下文依据检查只检查单份回答与来源的关系。",
    "sourceLabel": "补充解析",
    "sourcePage": 151,
    "references": [
      {
        "title": "Bedrock 上下文依据检查",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
      },
      {
        "title": "Bedrock 评审模型和自定义指标",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
      }
    ],
    "questionPage": 58
  },
  {
    "id": 120,
    "stem": "某公司部署了一个生成式AI应用，该应用使用Amazon Bedrock基础模型（FM）和自定义提示词。公司必须实施一个自动化质量保证系统，根据预期响应验证FM的输出，并检测一段时间内的回归问题。\n该解决方案必须使用语义相似性评分，将输出与超过500个标准示例进行比对。该解决方案必须支持定期调度的测试规则。该解决方案必须能够在6个月内扩展到超过2000个测试用例，无需修改架构。公司希望生成质量指标的可视化图表。如果解决方案检测到质量下降，公司必须收到警报。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "使用Amazon SageMaker Model Monitor跟踪FM中的数据漂移。为漂移指标配置Amazon CloudWatch警报。使用SageMaker AI处理作业运行FM输出的计划评估。",
      "B": "创建AWS Lambda函数，在测试用例上调用FM。将结果与预期输出进行比对。配置Amazon EventBridge调度规则来运行测试执行。将自定义指标发布到Amazon CloudWatch，以生成指标可视化图表和警报。",
      "C": "使用AWS Step Functions工作流运行测试用例并验证响应。将测试结果存储在Amazon DynamoDB中。使用Amazon CloudWatch控制面板可视化结果。",
      "D": "配置Amazon CloudWatch Synthetics canary来调用FM API。将响应与基线脚本进行比对。根据canary成功率创建CloudWatch警报。"
    },
    "answer": [
      "B"
    ],
    "page": 68,
    "explanation": "B 把每条标准示例变成可重复运行的测试。EventBridge 定期触发 Lambda，函数调用模型后计算输出与参考答案的语义相似度，再把均分或低于阈值的比例发布到 CloudWatch，用同一指标绘图、告警。测试集从 500 条增至 2,000 条时可分批执行。A 的漂移指标与参考答案相似度是两种不同指标。",
    "sourceLabel": "补充解析",
    "sourcePage": 152,
    "references": [
      {
        "title": "定期调用 Lambda",
        "url": "https://docs.aws.amazon.com/lambda/latest/dg/with-eventbridge-scheduler.html"
      },
      {
        "title": "向 CloudWatch 发布自定义指标",
        "url": "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html"
      }
    ],
    "questionPage": 58
  },
  {
    "id": 121,
    "stem": "一家金融服务公司需要为多语言AI助手构建零-touch升级工作流，可自动将提示词更新从开发环境部署到生产环境。该工作流仅当更新满足多项标准时才允许推送提示词更新。\n更新必须提升AI助手支持的全部五种语言的准确性。更新必须在相似查询中表现出比旧提示词版本更低的方差。更新必须通过所有针对投资风险和费用披露相关内容的法规合规检查。\n该工作流必须运行在公司现有的CI/CD流水线内部，支持提示词版本对比，生成可审计的评估报告，并且长期保持成本效益。\n哪个方案能够满足这些要求？",
    "options": {
      "A": "使用Amazon SageMaker Canvas可视化对比提示词输出。创建仪表板展示指标。将评估结果导出到文档协作系统，供合规审查。安排提示词工程师与合规官员每周开会讨论改进方案。",
      "B": "使用Amazon S3对象版本实现提示词版本控制。配置AWS Lambda函数手动对响应打分。将评估指标存储在Amazon DynamoDB表中。构建自定义Amazon QuickSight仪表板，可视化不同语言和产品类型的准确性。",
      "C": "使用Amazon Bedrock Prompt Management实现提示词版本控制，并对提示词执行A/B测试。使用Amazon Bedrock Evaluations和基于LLM的评审器对准确性和一致性指标执行自动评估。在Amazon Bedrock中创建流来简化跨语言测试。将该流与现有CI/CD流水线集成。",
      "D": "构建自定义评估框架，使用AWS Amplify作为前端，AWS Lambda函数作为后端。实现众包功能，让团队成员对响应质量投票。使用Amazon Comprehend分析响应中的情感，评估跨语言一致性。"
    },
    "answer": [
      "C"
    ],
    "page": 69,
    "explanation": "C 为新旧提示词保留独立版本，并在相同的多语种测试集上运行两版。流水线应逐种语言对比准确率，按同义问法分组测方差，再检查风险和费用披露是否全部合格。把各项结果和版本号存入评估报告，三类条件全部通过才发布。A 依赖每周人工会议，五种语言的总体均分也可能掩盖某一种语言退步。",
    "sourceLabel": "补充解析",
    "sourcePage": 153,
    "references": [
      {
        "title": "比较提示词版本",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-compare.html"
      },
      {
        "title": "Bedrock 评审模型和自定义指标",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation-judge.html"
      }
    ],
    "questionPage": 59
  },
  {
    "id": 122,
    "stem": "一家金融公司正在构建一个人工智能驱动的推荐系统。该系统使用实时市场数据和经过验证的内部文档。系统必须具备评估能力，用于收集明确的用户评分并实时检测有问题的响应。系统必须具备评估能力，用于长期跟踪模型性能，并支持对不同提示或模型变体进行A/B测试。\n系统必须编排多步骤工作流。这些工作流必须检索可信知识、验证输入并生成推荐。系统必须将所有用户反馈、标记事件和审计日志安全存储在符合合规要求的不可变存储库中。该存储库必须是一次写入、防篡改存储，适用于受监管的审计留存要求。\n哪一种架构能够满足这些要求？",
    "options": {
      "A": "在Amazon SageMaker JumpStart上部署微调后的基础模型。使用Amazon Bedrock AgentCore编排输入验证和检索工作流。将用户反馈和标记查询存储在Amazon DynamoDB中。对AWS CloudTrail日志运行定时Amazon Athena查询进行异常检测。将生成的输出存储在加密的Amazon S3存储桶中。启用S3 Object Lock。",
      "B": "配置Amazon API Gateway调用从Amazon Kendra检索数据的Amazon Bedrock基础模型。将所有响应存储在加密的Amazon S3存储桶中。启用S3 Object Lock。使用Amazon Macie扫描存储的日志以查找有问题的内容。",
      "C": "使用Amazon Bedrock AgentCore编排从已整理的Amazon Kendra索引中检索数据的流程。配置AWS Lambda函数清理输入。配置函数检查生成后的事实一致性。配置函数拆分流量以进行A/B测试。将用户反馈存储在Amazon DynamoDB中。通过AWS CloudTrail写入审计日志。将日志存储在Amazon S3中。启用S3 Object Lock。使用Amazon SageMaker Model Monitor持续跟踪数据漂移和输出异常。",
      "D": "构建基于Amazon Lex对话的AI助手，通过别名将一定比例的查询路由到两个Amazon SageMaker AI端点获取推荐。将交互记录到Amazon CloudWatch Logs。每季度进行手动审计，检测幻觉和提示注入。将反馈存储在加密的Amazon RDS中。"
    },
    "answer": [
      "C"
    ],
    "page": 70,
    "explanation": "C 同时提供检索、输入校验、生成后检查、流量分组和反馈存储，最接近完整工作流。严格按题干，C 还缺一环。DynamoDB 中的评分和应用标记事件也要写入启用 S3 Object Lock 并配置保留期的对象版本，只锁定 CloudTrail 日志无法保全反馈正文。Model Monitor 用于跟踪长期漂移，逐条事实检查仍要在应用中完成。",
    "sourceLabel": "补充解析",
    "sourcePage": 154,
    "references": [
      {
        "title": "S3 Object Lock 与不可变保留",
        "url": "https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html"
      }
    ],
    "questionPage": 59
  },
  {
    "id": 123,
    "stem": "一家零售公司拥有一个使用Amazon Bedrock中基础模型（FM）的产品推荐系统。该系统处理并搜索每小时更新的数百万个产品嵌入向量。公司会定期添加新产品。\n在大型购物活动高峰期，当前解决方案在产品目录中执行相似性搜索时会出现高延迟，偶尔还会发生故障。公司必须解决这些性能问题。\n哪种解决方案能够满足此要求？",
    "options": {
      "A": "使用多节点架构部署Amazon OpenSearch Service。配置向量专用的索引设置和内存断路器。建立专用的向量操作队列，以应对高峰使用时段的容量突增需求。",
      "B": "部署使用稀疏向量压缩的Amazon DynamoDB表。实现并行查询执行器来处理搜索操作。配置DynamoDB Streams和AWS Lambda函数，以实时维护向量索引。",
      "C": "搭建使用自定义向量分区的Amazon Bedrock知识库。实现分层元数据结构。将知识库与Amazon EventBridge集成，提供同步的目录更新并生成向量。",
      "D": "部署带有专用向量端点的Amazon Neptune集群。配置自定义相似度计算函数。使用Neptune批量加载器API管理整个产品目录的向量更新。"
    },
    "answer": [
      "A"
    ],
    "page": 70,
    "explanation": "A 的多节点 OpenSearch 可将向量索引分片，分摊搜索和更新负载。针对 k-NN 配置索引并监控各节点的图索引内存与断路器阈值，可识别高峰时查询变慢、更新遭拒的原因。流量缓冲还需安排队列和消费者容量。“专用向量队列”不宜理解成创建索引后即有的托管功能。B 提出的 DynamoDB 稀疏向量压缩也没有交代相似度检索如何执行。",
    "sourceLabel": "补充解析",
    "sourcePage": 155,
    "references": [
      {
        "title": "OpenSearch Service 的 k-NN 索引与内存限制",
        "url": "https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html"
      }
    ],
    "questionPage": 60
  },
  {
    "id": 124,
    "stem": "一家医疗保健公司正在开发一款应用程序，该应用程序可处理敏感患者数据，并使用基础模型（FM）生成治疗总结。应用程序必须保留所有提示和补全内容的审计跟踪。应用程序必须在整个处理生命周期中安全处理受保护健康信息（PHI）数据。该公司必须跟踪所有包含原始患者数据的提示-补全对，但必须从存储记录中删除所有PHI。该公司必须强制执行医疗保健特定的数据保留策略。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "将提示-补全对存储在Amazon S3中，并启用默认服务器端加密。部署一个AWS Lambda函数，使用Amazon Comprehend Medical扫描记录。配置Lambda函数，使其在所需保留期过后删除PHI数据。",
      "B": "使用Amazon Bedrock Prompt Management和Amazon Bedrock Flows检测PHI。配置Amazon Bedrock Guardrails使用敏感信息过滤器自动掩盖PHI。将日志存储在Amazon S3中，并配置适当的保留设置。",
      "C": "将提示-补全对存储在Amazon S3中。在合规模式下配置S3 Object Lock。对PHI数据应用基于标签的S3生命周期策略。配置一个AWS Lambda函数，在应用程序处理数据后修订患者信息。",
      "D": "将患者数据存储在Amazon Bedrock知识库中。使用Amazon Comprehend Medical识别PHI。配置一个AWS Lambda函数，根据医疗保健政策管理数据保留。"
    },
    "answer": [
      "B"
    ],
    "page": 71,
    "explanation": "B 的方向是在审计记录落盘前，对提示和回答两端都做脱敏，再把带请求标识的记录写入有保留策略的 S3。A、C 会先写入原始患者信息。Prompt Management 管理模板，Flows 编排步骤，PHI 检测需要实际的检测器和规则。仅启用通用 PII 过滤不足以证明已删除全部 PHI，还须检查模型调用日志是否另存了原文。",
    "sourceLabel": "补充解析",
    "sourcePage": 156,
    "references": [
      {
        "title": "Bedrock 敏感信息过滤器",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
      },
      {
        "title": "Comprehend Medical 的 PHI 检测",
        "url": "https://docs.aws.amazon.com/comprehend-medical/latest/dev/textanalysis-phi.html"
      },
      {
        "title": "Bedrock 模型调用日志记录范围",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"
      }
    ],
    "questionPage": 60
  },
  {
    "id": 125,
    "stem": "一家金融服务公司运营着一款AI应用，该应用使用Amazon Bedrock基础模型（FM）根据客户文档生成个性化投资推荐。这款AI应用会处理客户投资组合、财务报表和监管文档来创建个性化推荐。\n由于数据质量不佳，该公司目前遇到模型性能不稳定的问题。部分文档包含公司必须脱敏处理的个人可识别信息（PII），其他文档则存在格式不一致的问题，会干扰基础模型。该公司需要一个解决方案来确保输入稳定、高质量，以优化基础模型，且该解决方案必须符合金融法规和PII处理政策。\n哪个方案能满足这些需求，同时运营开销最低？",
    "options": {
      "A": "使用Amazon Macie自动检测并脱敏PII。使用AWS Lambda函数和Amazon Textract强制实现标准文档格式。创建可适配单个文档架构的动态提示，提升模型一致性。",
      "B": "使用Amazon Comprehend通过自定义实体识别检测PII。使用AWS Step Functions编排文档预处理工作流。使用带条件逻辑的提示模板有效处理架构差异。",
      "C": "使用Amazon Bedrock Guardrails在推理期间过滤PII。使用预处理AWS Lambda函数标准化文档格式。使用少样本提示技术和标准化示例提升不同文档类型的模型性能。",
      "D": "使用Amazon Textract分析文档结构并提取文本。使用Amazon Comprehend检测PII并分析情感。设计提示工程策略，利用结构化元数据提升基础模型推理能力并减少幻觉。"
    },
    "answer": [
      "C"
    ],
    "page": 71,
    "explanation": "C 对准两种输入缺陷。预处理 Lambda 把不同文档整理成相同字段和格式，输入护栏遮蔽已配置的 PII，少样本示例再演示模型应如何处理这些字段。A 中的 Macie 可以发现敏感数据，仍需要另行执行脱敏。推理时遮蔽只影响这次处理的数据，S3 源文件如需脱敏须单独处理。",
    "sourceLabel": "补充解析",
    "sourcePage": 157,
    "references": [
      {
        "title": "Bedrock 敏感信息过滤器",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-sensitive-filters.html"
      }
    ],
    "questionPage": 61
  },
  {
    "id": 126,
    "stem": "一家跨国公司使用AWS Organizations中的组织管理25个AWS账户。公司产品日均有50,000次用户交互。该公司正使用Amazon Bedrock AgentCore构建AI助手。\n该AI助手需要访问存储在多个不同业务单元AWS账户中的客户数据，并且需要代表特定用户执行操作，查询各业务单元AWS账户中存储客户信息的Amazon DynamoDB表。每个业务单元都维护自己的AWS账户，托管自身的DynamoDB表。\n公司必须实施严格的数据访问安全边界，并且必须收集完整审计轨迹，记录哪个用户的凭证被用于执行每一项操作。该解决方案需要允许AgentCore应用程序在保留用户身份上下文的前提下，跨多个账户访问资源，并且需要支持公司明年扩展到40个以上AWS账户的规划。\n哪个解决方案能以最低的运营开销满足这些要求？",
    "options": {
      "A": "将AI助手配置为使用出站凭证提供程序，运行AssumeRole操作动态获取临时凭证，使AI助手能够跨账户访问资源。在每个业务单元账户中创建一个IAM角色，该角色与AI助手的执行角色建立信任关系，并拥有访问DynamoDB表的权限。确保AssumeRole调用包含会话标签以标识最终用户。",
      "B": "在每个业务单元账户中创建单独的AI助手。部署运行请求路由逻辑的Amazon API Gateway REST API。创建AWS Lambda授权器，根据请求上下文中的客户业务单元标识符，将用户查询定向到对应的AI助手。",
      "C": "使用AWS Resource Access Manager (AWS RAM)将每个业务单元账户中的DynamoDB表共享到AI助手运行的中心账户。配置AWS RAM权限以允许跨账户访问DynamoDB表。直接向AgentCore执行角色授予访问共享资源的权限。",
      "D": "为组织配置SCP，明确允许AI助理的执行角色主体在所有成员账户中执行dynamodb:GetItem和dynamodb:Query操作。将AI助手配置为在资源定义中直接引用跨账户DynamoDB表的ARN。"
    },
    "answer": [
      "A"
    ],
    "page": 72,
    "explanation": "A 让代理为本次操作取得目标账户角色的临时凭证，各账户只开放自己的 DynamoDB 表。将已认证的用户身份绑定到受控会话标签，可按用户施加权限和关联审计。要追溯到每次 Query 或 GetItem，须记录表级 CloudTrail 数据事件，可用 SourceIdentity 标识角色会话来源。D 中的 SCP 只能限制权限，无法向代理授予表访问权。",
    "sourceLabel": "补充解析",
    "sourcePage": 158,
    "references": [
      {
        "title": "AWS STS 会话标签",
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html"
      },
      {
        "title": "用源身份审计角色会话",
        "url": "https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_control-access_monitor.html"
      },
      {
        "title": "DynamoDB 的 CloudTrail 数据事件",
        "url": "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/logging-using-cloudtrail.html"
      }
    ],
    "questionPage": 61
  },
  {
    "id": 127,
    "stem": "一家医院正在开发一款人工智能应用，帮助临床医生制定治疗决策。该应用使用Amazon Bedrock分析患者病史并给出诊断建议。应用必须保持低于500毫秒的响应时间，才能集成到医院现有的实时临床工作流程中。为了遵守隐私法规，应用必须记录所有可识别个人信息（PII）的处理决策，以备审计。应用必须以至少99%的准确率检测并从响应中删除PII。\n首次部署后，临床医生报告称，该应用生成的诊断摘要偶尔会包含原始病史输入中不存在的患者姓名和病历号。调查显示，Amazon Comprehend Medical以95%的准确率成功检测并删除了输入中的PII，应用会在将输入发送到Amazon Bedrock之前，用令牌替换所有检测到的实体。然而，应用仍然会在大约3%-5%的输出中生成可识别患者身份的信息。\n该企业需要一个解决方案，在满足所有其他运营要求的同时，防止应用在输出中显示PII。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "在Amazon Bedrock防护栏中配置敏感信息过滤器，以检测并阻止模型输出中的PII。",
      "B": "在将输入发送到Amazon Bedrock之前，使用正则表达式和自定义实体识别实现二级PII检测层，检测Amazon Comprehend Medical遗漏的标识符。",
      "C": "在预处理过程中从病史中删除详细的医疗上下文，防止模型基于临床模式关联生成特定于患者的信息。",
      "D": "在Amazon Bedrock API调用中启用会话隔离。在请求之间清除对话历史记录，防止患者信息在多个病例分析之间留存。"
    },
    "answer": [
      "A"
    ],
    "page": 73,
    "explanation": "题面已经说明输入做过脱敏，剩余泄露出现在生成端，因此要在向用户发送回答前检查输出。Bedrock Guardrails 的敏感信息过滤器可对识别出的 PII 执行拦截。高置信输入过滤无法排除模型在输出中重新生成身份线索。",
    "sourceLabel": "社区讨论整理",
    "sourcePage": 159,
    "votes": {
      "A": 100
    },
    "questionPage": 62
  },
  {
    "id": 128,
    "stem": "某公司正在设计一款生成式AI解决方案，帮助8至14岁的儿童了解世界历史。该系统必须支持课堂中最多30名儿童同时使用，并在1秒内提供响应。该公司使用Amazon Bedrock和Amazon Nova Pro，其知识库包含面向6至21岁学生编写的历史教科书。该公司使用Amazon Bedrock流程确保解决方案利用知识库生成每一条响应。该公司将提示响应温度设置为0.7。\n该解决方案的早期测试中出现了一些不符合历史事实、包含暴力内容且不适合儿童的响应。一名生成式AI开发人员必须阻止该解决方案生成不准确且不适当的提示响应。\n哪个解决方案能够满足此要求？",
    "options": {
      "A": "提高流程中的推理温度。在流程中的初始响应后添加一个节点，调用Amazon Nova模型从响应中删除所有暴力内容。返回该模型调用的结果。",
      "B": "通过内容过滤器为模型响应配置Amazon Bedrock防护栏。将内容过滤器强度设置为高，将防护栏操作设置为拦截。将防护栏添加到流程中。降低流程中的推理温度。",
      "C": "使用带有自定义输出的Amazon Bedrock Data Automation从知识库中删除所有暴力内容。提高流程中的推理温度。",
      "D": "通过内容过滤器为提示词配置Amazon Bedrock防护栏。将内容过滤器强度设置为高，将防护栏操作设置为拦截。将防护栏添加到流程中。降低流程中的推理温度。"
    },
    "answer": [
      "B"
    ],
    "page": 73,
    "explanation": "B 把暴力内容过滤器放在模型响应一侧，可以拦住由模型生成的不适龄文字。D 只检查输入，普通历史问题也可能触发含暴力描写的回答。降低 temperature 会减少随机性，但史实仍需要用教材来源核对，可配合依据检查。课堂 30 人并发、1 秒响应的要求也要用实际调用测量。",
    "sourceLabel": "补充解析",
    "sourcePage": 160,
    "references": [
      {
        "title": "Bedrock 输入和输出内容过滤器",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-content-filters.html"
      },
      {
        "title": "Bedrock 上下文依据检查",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"
      }
    ],
    "questionPage": 62
  },
  {
    "id": 129,
    "stem": "一家法律研究公司正在开发一款人工智能聊天助手，该助手使用带知识库的Amazon Bedrock，知识库中包含数百万份法律文档。当律师搜索法律案例先例时，初始检索会返回大量文档。该公司希望聊天助手能在3秒内生成所有回复。\n聊天助手使用的基础模型（FM）存在上下文窗口限制，每个查询仅能有效处理10份文档。目前，检索配置通过语义搜索获取50份文档。\n律师反馈高度相关的先例经常出现在结果的第15至40位。\n该公司需要一个解决方案来提高查询结果的相关性，且该方案必须满足公司的延迟要求和上下文窗口限制。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "保持50份文档的检索，但提高FM的temperature参数。应用提示工程技术，指示模型在生成响应之前从完整结果集中识别最相关的文档。",
      "B": "在知识库中启用重排序，使用带特定语言配置的重排序器模型。将聊天助手配置为初始检索50份文档。使用重排序器模型的交叉编码器架构评估查询-文档对。仅返回得分最高的前10份文档。",
      "C": "配置三个独立的知识库。分别配置一个使用500 token分块的知识库、一个使用1000 token分块的知识库，以及一个使用2000 token分块的知识库。通过AWS Lambda函数实现预处理行动组，从每个知识库检索50份文档，合并总共150条结果，然后使用词频-逆文档频率（TF-IDF）评分选出前10份文档。",
      "D": "通过AWS Lambda函数实现后处理行动组，检索50份文档，使用Amazon Titan Embeddings计算查询嵌入和每个文档嵌入之间的余弦相似度分数。将行动组配置为按相似度分数排序，返回前10份文档。"
    },
    "answer": [
      "B"
    ],
    "page": 74,
    "explanation": "B 保留初次检索的 50 个候选，使原来排在第 15 至 40 位的案例仍有机会被选中。重排序器再按查询与候选内容的相关性打分，把最相关的 10 份交给生成模型，恰好符合上下文上限。D 再算一次向量相似度，可能重现原有排序。重排序增加一次计算，3 秒目标需计入检索、重排和生成的总耗时。",
    "sourceLabel": "补充解析",
    "sourcePage": 161,
    "references": [
      {
        "title": "Bedrock 重排序模型",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html"
      }
    ],
    "questionPage": 63
  },
  {
    "id": 130,
    "stem": "一家跨国医疗保健公司正在构建生成式AI（GenAI）解决方案，用于分析患者医疗记录和临床试验数据，以识别治疗模式并生成研究见解。该公司开展业务的部分国家要求公司在每个国家的本地本地存储患者数据。\n该解决方案必须为全球各地的远程诊所提供低延迟的AI辅助诊断。该解决方案必须使用基于云的基础模型（FM）来执行先进的大规模分析。该公司需要一款解决方案来满足数据驻留要求、在诊所提供低于100毫秒的推理延迟，并在混合环境中支持一致的开发工作流。\n哪个解决方案能以最少的运营开销满足这些要求？",
    "options": {
      "A": "使用AWS Global Accelerator降低远程诊所的延迟。通过AWS DataSync将本地患者数据复制到Amazon S3。所有模型请求都通过托管在单个AWS区域的集中式推理端点处理。",
      "B": "在每个国家/地区的Amazon EC2实例上部署开源基础模型，以合规数据驻留要求。将患者数据本地存储在Amazon EBS卷。使用AWS Systems Manager管理跨国家/地区的模型更新。手动将聚合研究见解导出为CSV文件，保存到每个AWS区域的Amazon S3存储桶，以执行跨国分析。",
      "C": "在多个AWS区域的Amazon EC2 GPU实例上部署基础模型。将患者数据从本地系统复制到云。集中进行模型训练和推理。",
      "D": "对有数据驻留要求的国家/地区，使用AWS Outposts在本地处理和存储敏感患者数据。在远程诊所部署AWS Wavelength来执行实时推理。"
    },
    "answer": [
      "D"
    ],
    "page": 74,
    "explanation": "D 的本地和边缘分工最接近题意。Outposts 可在指定国家的自有场所处理、存储敏感记录，Wavelength 可把推理工作负载放到靠近受支持移动网络用户的边缘区。Wavelength Zone 由 AWS 与运营商提供，无法在任意诊所自行安装。还需确认覆盖范围、端到端 100 毫秒目标，以及哪些数据可合法传至云端做大规模分析。",
    "sourceLabel": "补充解析",
    "sourcePage": 162,
    "references": [
      {
        "title": "AWS Outposts 的部署位置与本地存储",
        "url": "https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html"
      },
      {
        "title": "AWS Wavelength 的网络和部署位置",
        "url": "https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html"
      }
    ],
    "questionPage": 63
  },
  {
    "id": 131,
    "stem": "一家跨国企业运行着由AI驱动的文档处理流水线，该流水线使用Amazon Bedrock文本文档生成摘要。流水线在流量高峰时段偶尔会出现超时，超时会导致服务性能下降。\n该公司需要一个解决方案，能够在任意60秒窗口内错误率超过10%时进行检测，当错误率超过阈值时，解决方案必须切换到备用处理路径，并且在流水线恢复后自动恢复正常的Amazon Bedrock处理。公司必须确保所有文档都能在15分钟内处理完成。\n哪个方案可以满足这些要求？",
    "options": {
      "A": "配置一个AWS Step Functions工作流，通过在Amazon DynamoDB中跟踪Amazon Bedrock调用失败来实现熔断器模式。配置工作流根据当前失败状态在正常处理路径和备用处理路径之间路由处理任务。",
      "B": "配置一个AWS Step Functions工作流，使用AWS Lambda函数轮询Amazon Bedrock的Amazon CloudWatch指标。将错误率指标存储在Amazon DynamoDB中。当错误率超过10%时，通知公司员工手动更新工作流，将流量转移到备用处理路径。",
      "C": "配置一个AWS Step Functions状态机，在Task状态中为Amazon Bedrock调用实现重试/捕获逻辑。配置一个Amazon CloudWatch告警，当错误率超过10%时触发Amazon EventBridge规则，将流量从状态机引导到备用处理路径。",
      "D": "部署多个相同的AWS Step Functions状态机，在Amazon API Gateway API后端使用多个Amazon Bedrock模型。使用自定义健康检查AWS Lambda函数将请求路由到响应最快的状态机。"
    },
    "answer": [
      "A"
    ],
    "page": 75,
    "explanation": "A 为所有文档共享同一熔断状态。应按滚动 60 秒统计失败数和总调用数，错误率超过 10% 就自动切到备用路径。冷却后以少量请求探测，成功再恢复正常路径。C 的 Retry/Catch 只处理单次执行，告警本身也不会改写工作流中的路由。要兑现 15 分钟时限，还需为备用路径安排足够容量并跟踪文档截止时间。",
    "sourceLabel": "补充解析",
    "sourcePage": 163,
    "references": [
      {
        "title": "AWS 的熔断器实现",
        "url": "https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html"
      }
    ],
    "questionPage": 64
  },
  {
    "id": 132,
    "stem": "一家传媒公司需要为包含10,000小时内容的视频库自动生成可搜索元数据。每个视频都包含视觉场景、语音对话、背景音乐和屏幕文本。\n该公司需要一个解决方案，能够从每个视频中提取场景描述、带时间戳的说话人文字转写结果、屏幕叠加文本内容以及情感上下文。输出必须同步所有类型的元数据，并创建可搜索索引。用户必须能够基于任意元数据类型进行搜索，并直接跳转到每个视频的特定时间点。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "创建一个Amazon SageMaker AI处理作业，按固定间隔提取视频帧。使用Amazon Transcribe处理音频并执行语音转文本转换。在Amazon Bedrock中使用Anthropic Claude模型单独处理每一帧，生成多模态场景分析。将输出存储在按内容类型组织的独立Amazon S3存储桶中。",
      "B": "创建一个Amazon SageMaker AI处理作业，按固定间隔提取视频帧并附加时间戳。启用时间标记后使用Amazon Transcribe处理音频。在Amazon Bedrock中使用Anthropic Claude模型分析帧-文字转写对。将输出存储在保留时间关系的统一JSON结构中。",
      "C": "创建一个由SageMaker AI流水线编排的Amazon SageMaker AI并行处理作业。在流水线中配置多个步骤：提取视频片段，使用Amazon Transcribe处理音频流，使用Amazon Rekognition分析视频帧以检测场景中的文本，使用Amazon Comprehend执行情感分析，并将统一元数据存储在按时间分区的Amazon DynamoDB中。",
      "D": "创建一个Amazon SageMaker AI处理作业，在Amazon Bedrock中配置Anthropic Claude Opus，为每个视频生成全面的多模态分析。将处理作业配置为通过单次推理请求提取元数据，并将结果索引到Amazon OpenSearch Service中以提供时间搜索功能。"
    },
    "answer": [
      "B"
    ],
    "page": 75,
    "explanation": "B 用同一时间轴把视频帧与说话人转写对齐，模型即可结合同一时刻的画面和对白描述场景、屏幕文字及情绪。Transcribe 需启用说话人分离。统一 JSON 里应保留视频 ID 和片段起止时间，再把这些字段和文本写入可搜索索引。只保存 JSON 还不能完成全文检索，抽帧间隔过大也会漏掉短暂出现的字幕。",
    "sourceLabel": "补充解析",
    "sourcePage": 164,
    "references": [
      {
        "title": "Amazon Transcribe 说话人分离与时间戳",
        "url": "https://docs.aws.amazon.com/transcribe/latest/dg/diarization.html"
      }
    ],
    "questionPage": 64
  },
  {
    "id": 133,
    "stem": "一家金融服务公司正在开发生成式AI应用程序，该应用程序需要使用基础模型（FM）分析多个AWS账户中的数据。数据和应用程序分别位于三个独立账户的Amazon S3存储桶中：账户A包含交易数据，账户B包含客户资料（包括个人身份信息PII），账户C托管该生成式AI应用程序。公司计划在未来几个月内新增来自另外七个业务部门的数据源。\n公司必须对PII数据实施严格管控，确保基础模型仅访问必要的数据字段。\n公司需要一个解决方案来为该生成式AI应用程序建立安全的跨账户访问。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "使用AWS Identity Center为FM服务账户创建权限集。在每个S3存储桶上配置基于资源的策略，允许账户C进行特定访问。部署自定义AWS Lambda鉴权器，在将数据传递给FM之前过滤PII数据。",
      "B": "配置Amazon Bedrock跨账户IAM角色。在每个源账户中创建基于角色的访问策略，仅允许访问特定的S3存储桶路径。对S3对象应用基于标签的访问控制，对PII数据进行分类和访问控制。",
      "C": "在每个源账户中设置AWS Lake Formation。向Lake Formation注册S3存储桶。在每个源账户中创建IAM角色，该角色拥有访问特定S3存储桶路径的权限。配置Lake Formation权限，通过Lake Formation基于标签的访问控制仅允许访问特定数据列。使用Amazon SageMaker AI在账户C中通过一个执行角色部署FM，该执行角色可以通过Lake Formation担任跨账户IAM角色来访问数据。",
      "D": "在每个源账户的S3存储桶上配置基于资源的策略，允许来自账户C中生成式AI应用程序的访问。为FM的服务角色配置基于身份的策略，通过AWS Lake Formation基于标签的访问控制仅允许访问特定数据列。在每个账户中设置VPC端点来提供安全的跨账户访问。"
    },
    "answer": [
      "C"
    ],
    "page": 76,
    "explanation": "C 先在源账户注册数据并对可见列授予 Lake Formation 权限，再把经筛选的字段交给账户 C 的模型。即使 PII 与可用字段在同一 S3 对象中，也能按列控制。B 的对象标签只能区分整个对象。读取链路应经过支持 Lake Formation 的查询引擎，如 Athena，并限制绕开查询引擎直接读取原始 S3 对象的权限。",
    "sourceLabel": "补充解析",
    "sourcePage": 165,
    "references": [
      {
        "title": "Lake Formation 跨账户标签授权",
        "url": "https://docs.aws.amazon.com/lake-formation/latest/dg/cross-account-TBAC.html"
      },
      {
        "title": "Athena 与 Lake Formation 的集成",
        "url": "https://docs.aws.amazon.com/lake-formation/latest/dg/athena-lf.html"
      }
    ],
    "questionPage": 65
  },
  {
    "id": 134,
    "stem": "一家物流企业正在构建一个由智能生成式AI驱动的解决方案，实现货运优化自动化。该解决方案必须从多个内部和外部系统实时检索数据，在优化流程完成前必须包含人在回路审批环节，并且需要支持随集成数量和逻辑规模增长实现模块化扩展。\n以下哪个方案能够满足这些需求，同时产生的运营开销最低？",
    "options": {
      "A": "使用托管大语言模型（LLM）的Amazon SageMaker AI端点，由该端点直接调用所有内部数据库和外部API。使用自定义Web应用提供用户界面，实现人在回路审核环节。",
      "B": "使用Strands Agents SDK和Amazon Bedrock AgentCore构建分层系统。配置一个协调代理，将任务委托给多个专业化代理。使用MCP促进代理间消息传递。使用AWS Step Functions实现人在回路审批环节。",
      "C": "使用AWS Glue将运营数据聚合到Amazon S3，使用Amazon Athena查询数据，调用AWS Lambda函数生成路线分配，使用Amazon SNS向主管代理发送通知。",
      "D": "使用单个Amazon Bedrock AgentCore代理，搭配基于AWS Lambda的工具与所有内部和外部系统集成。使用AWS Step Functions编排审批工作流。"
    },
    "answer": [
      "B"
    ],
    "page": 76,
    "explanation": "B 让协调代理把任务委托给专业代理，新增承运商或库存接口时可独立扩展相应模块。Step Functions 的回调任务可暂停流程，收到审批结果后再继续。选项把 MCP 描述成代理间消息协议不够准确。MCP 通常用于调用工具，独立代理之间可使用 A2A，也可把专业代理封装为工具。C 发出通知后缺少等待审批的步骤。",
    "sourceLabel": "补充解析",
    "sourcePage": 166,
    "references": [
      {
        "title": "AgentCore Runtime 支持的通信协议",
        "url": "https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-service-contract.html"
      },
      {
        "title": "Step Functions 的回调任务",
        "url": "https://docs.aws.amazon.com/step-functions/latest/dg/connect-to-resource.html"
      }
    ],
    "questionPage": 65
  },
  {
    "id": 135,
    "stem": "一家金融服务公司正在使用Amazon Bedrock构建欺诈检测系统。该系统将监控运行在美国和欧洲的多个股票交易应用程序中的活动。系统必须每秒处理1,000笔交易，响应时间低于500毫秒，还必须在连接中断时保持高可用性。\n该公司必须确保欧洲客户的数据仅在位于欧洲的AWS区域进行处理。\n哪个解决方案可以满足这些要求？",
    "options": {
      "A": "配置AWS Lambda函数和Amazon EKS应用程序，对全局推理配置文件使用InvokeModel API。部署使用Amazon Route 53运行状况检查的自动故障转移系统。创建专用的欧洲推理配置文件，并为欧洲应用程序启用地理跨区域推理。使用Amazon CloudWatch警报监控利用率指标。",
      "B": "将所有应用程序配置为对每个区域中单独的Anthropic Claude模型使用带预置吞吐量的InvokeModel API。设置自定义应用程序负载均衡器，根据区域容量和响应时间分发流量。实现使用Amazon EventBridge规则的区域故障转移机制来处理连接中断。",
      "C": "将所有应用程序配置为使用带按需吞吐量的InvokeModelWithResponseStream API。在公司运营的每个位置部署带Regional端点的Amazon API Gateway REST API，将请求路由到最近的Amazon Bedrock端点。为在美国和欧洲运行的应用程序创建单独的IAM角色。授予IAM角色特定区域的权限。",
      "D": "将在美国运行的应用程序配置为使用带预置吞吐量的InvokeModel API。将欧洲应用程序配置为使用欧洲特定的地理推理配置文件，以确保数据主权。根据利用率指标为预置容量配置自动扩缩。使用Amazon EventBridge和AWS Lambda函数实现跨区域故障转移机制。"
    },
    "answer": [
      "A"
    ],
    "page": 77,
    "explanation": "A 的关键在于把欧洲请求固定到欧洲地理推理配置文件，故障转移路径也要执行同一限制。全局配置文件仅可供允许全球处理的流量使用。C 选择最近的端点，不能据此确认跨区域路由始终留在欧洲。配置文件提供路由范围，1,000 笔/秒和低于 500 毫秒还取决于模型、配额、容量和实测结果。",
    "sourceLabel": "补充解析",
    "sourcePage": 167,
    "references": [
      {
        "title": "Bedrock 地理跨区域推理",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/geographic-cross-region-inference.html"
      }
    ],
    "questionPage": 66
  },
  {
    "id": 136,
    "stem": "某公司正在实施一项为期两周的计划，将生成式AI集成到数百个现有应用程序中，为用户提供上下文驱动的自然语言帮助。为简化为每个应用选择合适模型的流程，一名生成式AI开发人员正在构建一个系统，用于根据通用文本生成准确率自动对比基础模型（FM）。该系统运行的任务会执行一系列步骤。\n首先，系统创建一个服务角色，并附加IAM权限策略，允许Amazon Bedrock调用基础模型，并授予对Amazon S3的访问权限。随后，系统申请并获取了所有待测试基础模型的访问权限。接着，系统创建S3存储桶来存储评估结果。之后，系统使用TREX内置数据集创建评估配置。最后，系统在每个评估配置中指定了Accuracy指标和Generation评估类型。\n当生成式AI开发人员尝试运行该系统时，运行失败并抛出AccessDenied异常。该开发人员必须解决此问题。\n哪个解决方案可以满足要求？",
    "options": {
      "A": "创建一个信任策略，将Amazon Bedrock定义为服务主体。将该信任策略附加到服务角色。",
      "B": "配置跨源资源共享（CORS）权限，允许对S3存储桶执行GET和DELETE操作。",
      "C": "在评估配置中将测试数据集从TREX修改为Gigaword。",
      "D": "在评估配置中将评估类型修改为Summarization，将指标类型修改为Correctness。"
    },
    "answer": [
      "A"
    ],
    "page": 77,
    "explanation": "A 补的是服务角色的信任关系。角色已有访问模型和 S3 的权限策略，但还要允许服务主体 bedrock.amazonaws.com 执行 sts:AssumeRole，评估任务才能取得这些权限。TREX 本来就支持通用文本生成的 Accuracy 评估。更换数据集、改变任务类型或修改浏览器 CORS 设置都无法修复这一授权缺口。",
    "sourceLabel": "补充解析",
    "sourcePage": 168,
    "references": [
      {
        "title": "自动模型评估的服务角色",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/automatic-service-roles.html"
      },
      {
        "title": "评估任务、指标和内置数据集对应表",
        "url": "https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-tasks.html"
      }
    ],
    "questionPage": 66
  }
];
