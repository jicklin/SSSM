﻿/*form cache:lang_cache_zh-CN_140815,cache_time:1434072684*/
if (typeof (sprintf) != "function") {
    function sprintf(str) {
        var array = str.split("%s");
        if (array.length == 1 || array.length != arguments.length)
            return str;

        str = array[0];
        for (var i = 1; i < array.length; i++) {
            str += arguments[i] + array[i];
        }

        return str;
    }
}

var td_lang = {};
td_lang.global = {
    page_up: "上一页",
    page_down: "下一页",
    songti: "宋体",
    delete_1: "删除",
    select: "选择",
    total: "合计",
    yes: "是",
    no: "否",
    reply: "回复",
    error: "错误：",
    close: "关闭",
    regist: "注册",
    first_page: "首页",
    before_page: "上页",
    next_page: "下页",
    last_page: "末页",
    refresh_1: "刷新",
    right: "正确",
    print: "打印",
    print_preview: "打印预览",
    clear: "清空",
    details: "详情",
    loading: "加载中..."
};

td_lang.module = {
    msg_1: "AIP服务器正忙，请稍候再试",
    msg_2: "服务器无效，请检查其是否已启动",
    msg_3: "出现未知的连接错误",
    msg_4: "无效的命令，可能系统不支持本操作",
    msg_5: "系统不支持本操作",
    msg_6: "错误的数据包格式，可能数据传输不正确",
    msg_7: "本机与服务器时间不符，被拒绝登录，请保证本机时间和服务器时间误差在十五分钟之内",
    msg_8: "指定证书已经被作废，无法使用",
    msg_9: "指定证书已经过期，无法使用",
    msg_10: "服务器数据库中未发现本用户对应的证书",
    msg_11: "请从文件柜或网络硬盘选择印章!",
    msg_12: "关于套红模版制作，请咨询技术支持人员。",
    msg_13: "新Word文档",
    msg_14: "新Excel工作表",
    msg_15: "新PowserPoint幻灯片",
    msg_16: "编辑文档",
    msg_17: "阅读文档",
    msg_18: "未知操作",
    msg_19: "不能使用微软Office软件打开文档！",
    msg_20: "是否尝试使用金山WPS文字处理软件打开文档？",
    msg_21: "参数错误：控件的第二个参数没有指定。",
    msg_22: "没有打开的文档。",
    msg_23: "WPS表格",
    msg_24: "文档处于阅读状态，您不能保存到服务器。",
    msg_25: "不能保存到URL：",
    msg_26: "未知应用程序",
    msg_27: "输出为PDF格式",
    msg_28: "发送邮件",
    msg_29: "OnDocumentOpened事件的Script产生错误。",
    msg_30: "用户:",
    msg_31: "该功能需要软件PDFCreator支持",
    msg_32: "请下载安装：",
    msg_33: "输出为 PDF 格式",
    msg_34: "不能保存PDF到URL：",
    msg_35: "上传文件数量超过限制",
    msg_36: "权限错误，本用户无权使用指定的印章",
    msg_37: "指定印章已经被作废，无法使用",
    msg_38: "指定印章已经过期，无法使用",
    msg_39: "指定印章不存在",
    msg_40: "权限错误，你无权操作本文档",
    msg_41: "文档已经被锁定，你无权操作",
    msg_42: "指定文档不存在",
    msg_43: "权限错误，你无权打印本文档",
    msg_44: "文档打印份数已用完，你无权打印本文档",
    msg_45: "打开服务器数据库失败",
    msg_46: "更新服务器数据库失败",
    msg_47: "不能上传0字节文件",
    msg_48: "无效的文件类型",
    msg_49: "未知错误：",
    msg_50: "上传失败：",
    msg_51: "HTTP错误：",
    msg_52: "上传失败：",
    msg_53: "服务器(IO)错误：",
    msg_54: "安全错误：",
    msg_55: "达到上传限制：",
    msg_56: "无法验证，跳过上传：",
    msg_57: "已取消",
    msg_58: "已停止",
    msg_59: "读取服务器数据库失败",
    msg_60: "操作服务器数据库失败",
    msg_61: "本用户还没有登录服务器，无法进行本操作",
    msg_62: "用户登录密码错误",
    msg_63: "本用户已被服务器作废",
    msg_64: "指定用户不存在",
    msg_65: "用户密码不符合格式，请联系管理员",
    msg_66: "未发现当前用户的证书信息",
    msg_67: "服务器未注册，请联系管理员",
    msg_68: "服务器上用户数多于授权数量，请联系管理员",
    msg_69: "本用户不属于本域服务器，请联系管理员",
    msg_70: "域服务器不支持此种登录方式",
    msg_71: "服务器端处理超时",
    msg_72: "服务器端发生未知错误，请联系管理员",
    msg_73: "域服务器地址无效，请保证其类似于IP:Port(直连)，或HTTP URL(如http://www.xx.com:8080/aipserver.jsp)",
    msg_74: "连接超时",
    msg_75: "用户取消",
    msg_76: "测试用户ID应该以'HWSEALDEMO'开始",
    msg_77: "未发现用户列表",
    msg_78: "有新用户登录",
    msg_79: "出现错误，操作被终止",
    msg_80: "无效的对象",
    msg_81: "无效数据错误",
    msg_82: "无效的窗口",
    msg_83: "无效的密码",
    msg_84: "身份校验出错",
    msg_85: "内存无法分配",
    msg_86: "错误的授权",
    msg_87: "错误的类型",
    msg_88: "未知错误",
    msg_89: "没有插入智能卡",
    msg_90: "错误的智能卡登录PIN码",
    msg_91: "系统未发现有效的私钥",
    msg_92: "系统未发现有效的证书",
    msg_93: "本机不存在CSP服务",
    msg_94: "本机存在多个智能卡",
    msg_95: "CSP驱动未安装,请确认已经安装了正确的智能卡驱动",
    msg_96: "操作智能卡过程中出现未知错误",
    msg_97: "身份验证未通过",
    msg_98: "智能卡中不存在印章"
};

td_lang.inc = {
    dragupload: "拖拽上传",
    drophere: "将文件拖拽此处上传",
    personfav: "个人收藏",
    multi_img_upload: "批量插入图片",
    msg_1: "不允许上传无后缀名的文件",
    msg_2: "图片只能为gif,jpg,png,bmp格式",
    msg_3: "参数无效",
    msg_4: "该文件已经添加",
    msg_5: "添加附件",
    msg_6: "从文件柜和网络硬盘选择附件",
    msg_7: "插入图片",
    msg_8: "查看日程",
    msg_9: "查看事务",
    msg_10: "查看任务",
    msg_11: "新建日程",
    msg_12: "修改日程",
    msg_13: "删除后将不可恢复，确定要删除吗？",
    msg_14: "删除后将不可恢复，如果是批量安排的日程将会批量删除，确定删除吗？",
    msg_15: "删除后将不可恢复，如果是批量安排的事务将会批量删除，确定删除吗？",
    msg_16: "删除后将不可恢复，如果是批量安排的任务将会批量删除，确定删除吗？",
    msg_17: "删除后将不可恢复，确定删除吗？",
    msg_18: "完成",
    msg_19: "未完成",
    msg_20: "事务内容不能为空！",
    msg_21: "页面tr未绑定数据edit_url",
    msg_22: "请选择发送用户",
    msg_23: "事务提醒历史记录",
    msg_24: "操作失败",
    msg_25: "万年历",
    msg_26: "世界时间",
    msg_27: "无标题",
    msg_28: "选择城市",
    msg_29: "请选择城市",
    msg_30: "正在加载，请稍候……",
    msg_31: "获取天气错误：",
    msg_32: "刷新",
    msg_33: "更改城市",
    msg_34: "获取事务提醒数据失败",
    msg_35: "查看分类详情",
    msg_36: "分类全部已阅",
    msg_37: "您有新的短消息！",
    msg_38: "获取短消息数据失败",
    msg_39: "发自",
    msg_40: "暂无新提醒",
    msg_41: "人员查询",
    msg_42: "网络连接错误",
    msg_43: "加载中，请稍候 ...",
    msg_44: "显示/隐藏列",
    msg_45: "无数据",
    msg_46: "此操作会导致比较缓慢,确定要执行吗?",
    msg_47: "请输入有效数字!",
    msg_48: "输入后按回车确认",
    msg_49: "页码",
    msg_50: "读取数据中，请稍候...",
    msg_51: "请求失败或超时，请稍后再试！",
    msg_52: "名称:",
    msg_53: "序号:",
    msg_54: "暂无更多数据",
    msg_55: "输入点什么再分享吧:)",
    msg_56: "请在这里输入话题",
    msg_57: "分享成功！",
    msg_58: "获取数据错误：",
    msg_59: "百度搜索",
    msg_60: "新浪网",
    msg_61: "58同城",
    msg_62: "天气",
    msg_63: "奇艺网",
    msg_64: "中国政府网",
    msg_65: "天涯社区",
    msg_66: "淘宝网",
    msg_67: "优酷网",
    msg_68: "百度贴吧",
    msg_69: "新浪体育",
    msg_70: "新浪新闻",
    msg_71: "百度mp3",
    msg_72: "虾米音乐",
    msg_73: "获取内容错误：",
    msg_74: "互联网应用",
    msg_75: "应用盒子",
    msg_76: "添加屏幕",
    msg_77: "桌面顺序已设置成功！",
    msg_78: "屏幕添加成功！",
    msg_79: "移除此屏",
    msg_80: "删除桌面，将删除桌面全部应用模块，确定要删除吗？",
    msg_81: "桌面删除成功！",
    msg_82: "应用已添加到当前桌面！",
    msg_83: "应用添加错误！",
    msg_84: "加载中...",
    msg_85: "加载失败",
    msg_86: "浏览器",
    msg_87: "手机浏览器",
    msg_88: "OA精灵",
    msg_89: "iPhone",
    msg_90: "Android",
    msg_91: "确认不显示该模块么?",
    msg_92: "请输入数值",
    msg_93: "显示条数和连接超时必须是数字",
    msg_94: "显示行数必须在1-1000之间",
    msg_95: "该模块已存在",
    msg_96: "操作超时",
    msg_97: "选择城市",
    msg_98: "请选择城市",
    msg_99: "获取天气信息错误",
    msg_103: "更新内容错误，代码：",
    msg_104: "操作失败：",
    msg_105: "页面加载错误",
    msg_106: "不允许上传后缀名为%s的文件",
    msg_107: "在线",
    msg_108: "微讯发送失败：%s",
    msg_109: "您好，%s！",
    msg_110: "%s确认要注销吗？",
    msg_111: "%s确认要退出吗？",
    msg_112: "操作失败%s",
    msg_113: "本窗口%s秒后自动关闭",
    msg_114: "文件%s已添加",
    msg_115: "禁止上传%s类型文件",
    msg_116: "您选择了%s个文件",
    msg_117: "文件大小(%s MB)超过限制(%s)",
    msg_118: "%s个文件上传成功，%s个文件上传失败，%s个文件取消。",
    msg_119: "Word 模板中不存在名称为：'%s'的书签！",
    msg_120: "每页%s条",
    msg_121: "第%s页/共%s页",
    msg_122: "检索到%s条记录，显示第%s条-第%s条记录",
    msg_123: "共%s条记录，显示第%s条-第%s条记录",
    msg_124: "当前桌面应用将超过%s个，继续添加将可能会引起新增应用无法显示和使用，确定要继续吗？",
    msg_125: "内容长度小于%s",
    msg_126: "确认要%s此工作吗？",
    msg_127: "数据统计：一天内发布%s篇，一周内发布%s篇，总共发布%s篇",
    msg_weixunshare_107: "已经@过此人",
    msg_weixunshare_108: "获取不到原微讯信息！",
    msg_weixunshare_109: "微讯转播成功！",
    msg_weixunshare_110: "确定要删除这条微讯吗？",
    msg_128: "在线",
    msg_129: "全部",
    msg_130: "无权限操作",
    msg_131: "%s 在线",
    msg_132: "您有新的事务提醒！",
    msg_133: "您有新的短消息和事务提醒！",
    msg_134: "发邮件",
    msg_135: "发微讯",
    msg_136: "暂无最近联系人",
    msg_137: "已发",
    msg_138: "提醒",
    msg_139: "群组",
    msg_140: "讨论组",
    msg_141: "查看天气",
    msg_142: "该模块添加成功",
    msg_143: "新建倒计时牌",
    msg_144: "编辑倒计时牌",
    msg_145: "推迟设置",
    msg_146: "查看详情",
    msg_147: "请填写推迟时间",
    msg_148: "填写的推迟时间应该为整数",
    msg_149: "推迟时间不能小于当前时间",
    msg_150: "名称不能为空",
    msg_151: "截止日期不能为空",
    msg_152: "截止日期应大于当前日期",
    msg_153: "已推迟任务",
    msg_154: "已忽略任务",
    msg_155: "今日工作",
    msg_156: "接下来工作",
    msg_157: "紧急超时未办理工作",
    msg_158: "倒计时牌",
    msg_159: "新建",
    msg_160: "办理时间将由",
    msg_161: "推迟到",
    msg_163: "您确定要删除吗？",
    msg_164: "您确定要忽略吗？",
    msg_165: "您确定要恢复吗？",
    msg_166: "刷新",
    msg_167: "有3日内到时的事件",
    msg_168: "有7日内到时的事件",
    msg_169: "秒前",
    msg_170: "分钟前",
    msg_171: "月",
    msg_172: "日 ",
    msg_173: "共享成功。",
    msg_174: "共享失败。",
    msg_175: "删除后无法恢复，是否删除该日志?",
    msg_176: "删除成功。",
    msg_177: "删除失败。",
    msg_178: "删除后无法恢复，是否删除该评论?",
    msg_179: "评论失败。",
    msg_180: "回复：",
    msg_181: "评论",
    msg_182: "今天 ",
    msg_183: "菜单",
    msg_184: "向上移动",
    msg_185: "向下移动",
    msg_186: "向右移动",
    msg_187: "向左移动",
    msg_188: "放大",
    msg_189: "缩小",
    msg_190: "适合窗口",
    msg_191: "全屏显示"
};

td_lang.general = {
    msg_1: "上传成功",
    msg_2: "正在上传...",
    msg_3: "图片批量上传完毕.",
    msg_4: "停止",
    msg_5: "请选择",
    msg_6: "确定要删除选中文件吗?",
    msg_7: "请至少选择一张图片",
    msg_8: "只能选择一个图片，重命名",
    msg_9: "隐藏目录树",
    msg_10: "显示目录树",
    msg_11: "不能空着哟...",
    msg_12: "你确定要删除吗？",
    msg_13: "您的话太多啦...",
    msg_14: "正在处理...",
    msg_15: "您的一条微讯已被删除...",
    msg_16: "都已显示了...",
    msg_17: "您所请求的页面不正常！",
    msg_18: "正在读取数据...",
    msg_19: "创建XMLHttp对象失败！",
    msg_20: "评论内容不能为空",
    msg_21: "评论提交成功",
    msg_22: "回答内容不能为空",
    msg_23: "答案提交成功",
    msg_24: "无相关微讯...",
    msg_25: "选择的文件已标记",
    msg_26: "请到目标目录中进行“粘贴”操作",
    msg_27: "登录",
    msg_28: "用户登录",
    msg_29: "用户名：",
    msg_30: "密码",
    msg_31: "用户名不能为空！",
    msg_32: "密码不能为空！",
    msg_33: "用户名或密码不对，请重新登录!",
    msg_34: "共 %s 人，%s 人在线"
};
td_lang.general.email = {
    loading: "加载中...",
    empty: "无内容",
    readmore: "显示更多",
    cancel: "取消"
};
td_lang.general.settingguide = {
    msg_1: "请输入确认新密码",
    msg_2: "两次输入的密码不一致",
    msg_3: "密码长度应为",
    msg_4: "位",
    msg_5: "新密码中含有非法字符!",
    msg_6: "密码必须同时包含字母和数字",
    msg_7: "新密码不能与原密码相同",
    msg_8: "请输入正确的手机号码",
    msg_9: "请输入正确的工作电话",
    msg_10: "请输入有效的E-mail地址",
    msg_11: "您已经填写了部分信息，需要保存吗？",
    msg_12: "修改成功",
    msg_13: "您确定退出设置向导吗？",
    msg_14: "输入的原密码错误"
}
td_lang.general.note = {
    msg_1: "最后编辑于",
    msg_2: "创建于",
    msg_3: "分享到邮件",
    msg_4: "分享到微讯",
    msg_5: "确定删除该条便签么？",
    msg_6: "删除"
}
td_lang.general.weixunshare = {
    send_btn_text: "发布",
    close_btn_text: "关闭",
    record_btn_text: "点击开始录制",
    cancel_btn_text: "取消",
    delimage_btn_text: "删除该图片",
    uploadimage_btn_text: "点击上传图片",
    tips_default: "来分享一下你的心情吧",
    tips_topic: "在这里输入你想要说的话题",
    insert_topic: "插入话题",
    insert_emotion: "插入表情",
    insert_pic: "插入图片",
    insert_voice: "录制语音",
    insert_person: "提到他/她",
    tips_publish: "按Ctrl+Enter键发送",
    tips_suggest: "选择最近@的人或者直接输入",
    tips_nomoredata: "暂无更多数据",
    tips_image_type: "图片格式支持 jpg、gif、png"
};

td_lang.general.workflow = {
    msg_1: "确认要将此工作恢复到执行中吗？",
    msg_2: "确认要强制结束所选工作吗？",
    msg_3: "要结束工作，请至少选择其中一项。",
    msg_4: "关注",
    msg_5: "取消关注",
    msg_6: "确认要删除所选工作吗？",
    msg_7: "该工作已删除",
    msg_8: "该工作未能删除，请联系系统管理员！",
    msg_9: "确认要结束该工作流程吗？",
    msg_10: "操作已成功",
    msg_11: "下一步骤尚未接收时可收回至本步骤重新办理，确认要收回吗？",
    msg_12: "您没有权限！",
    msg_13: "对方已接收，不能收回",
    msg_14: "工作已回收",
    msg_15: "被委托人尚未接收时可收回重新办理，确认要收回吗？",
    msg_16: "零",
    msg_17: "壹",
    msg_18: "贰",
    msg_19: "叁",
    msg_20: "确认要删除该步骤么？",
    msg_21: "步骤基本属性",
    msg_22: "经办人员",
    msg_23: "可写字段",
    msg_24: "经办部门",
    msg_25: "经办角色",
    msg_26: "删除连线",
    msg_27: "删除该步骤",
    msg_28: "新建步骤",
    msg_29: "保存布局",
    msg_30: "刷新视图",
    msg_31: "肆",
    msg_32: "伍",
    msg_33: "陆",
    msg_34: "柒",
    msg_35: "捌",
    msg_36: "玖",
    msg_37: "拾",
    msg_38: "佰",
    msg_39: "仟",
    msg_40: "万",
    msg_41: "亿",
    msg_42: "元",
    msg_43: "角",
    msg_44: "分",
    msg_45: "整",
    msg_46: "天",
    msg_47: "小时",
    msg_48: "秒",
    msg_49: "日期格式无效",
    msg_50: "确认要关注此工作么？",
    msg_51: " 格式不符,形如example@126.com",
    msg_52: " 格式不符,应为整数",
    msg_53: " 格式不符,应为日期类型",
    msg_54: " 格式不符,应为浮点数如123.45",
    msg_55: "中国兵器工业信息中心",
    msg_56: "请至少选择一条记录",
    msg_57: "确定要删除掉此记录吗？",
    msg_58: "请填写流程号为[%s]的%s信息",
    msg_59: "委托",
    msg_60: "挂起",
    msg_61: "批注",
    msg_62: "请至少输入点内容",
    msg_63: "下一级",
    msg_64: "修改表单",
    msg_65: "智能设计器",
    msg_66: "预览",
    msg_67: "导入",
    msg_68: "导出",
    msg_69: "历史版本",
    msg_70: "删除",
    msg_71: "视图",
    msg_72: "列表",
    msg_73: "新建表单分类",
    msg_74: "编辑表单分类",
    msg_75: "新建流程分类",
    msg_76: "编辑流程分类",
    msg_77: "表单分类序号不能为空！",
    msg_78: "表单分类序号必须为数字！",
    msg_79: "表单分类名称不能为空！",
    msg_80: "流程分类序号不能为空！",
    msg_81: "流程分类序号必须为数字！",
    msg_82: "流程分类名称不能为空！",
    msg_83: "该父级元素下的序号已经存在，请重新选择填写！",
    msg_84: "该父级元素下的名称已经存在，请重新选择填写！",
    msg_85: "新建表单分类成功！",
    msg_86: "编辑表单分类成功！",
    msg_87: "新建流程分类成功！",
    msg_88: "编辑流程分类成功！",
    msg_89: "请输入1-%s的值",
    msg_90: "请选择上传表单",
    msg_91: "表单名称不能为空",
    msg_92: "确认要将此版本恢复为应用版本吗？这将不可恢复！",
    msg_93: "已将版本",
    msg_94: "恢复成为应用版本",
    msg_95: "确认要删除该版本吗？这将不可恢复！",
    msg_96: "请选择要选中的步骤！",
    msg_97: "请选择正确的步骤！",
    msg_98: "没有可选的条件!",
    msg_99: "请选择要提前的步骤！",
    msg_100: "请选择要向下的步骤！",
    msg_101: "禁止会签",
    msg_102: "允许会签",
    msg_103: "强制会签",
    msg_104: "更新成功！",
    msg_105: "更新失败！",
    msg_106: "要执行删除操作，请至少选择其中一条。",
    msg_107: "删除后将不可恢复，确定要删除吗？",
    msg_108: "发起人不能为空！",
    msg_109: "发起时间不能为空！",
    msg_110: "请选择授权类型！",
    msg_111: "请指定授权范围！",
    msg_112: "请指定管理范围！",
    msg_113: "请输入模板名称！",
    msg_114: "请选择模板类别！",
    msg_115: "请选择模板文件！",
    msg_manage_priv_type_0: "可执行操作：查询、转交、委托、结束、删除、编辑、点评",
    msg_manage_priv_type_1: "可执行操作：查询、转交、委托、结束、删除",
    msg_manage_priv_type_2: "可执行操作：查询、转交、委托",
    msg_manage_priv_type_3: "可执行操作：查询(可以查看流程信息)",
    msg_manage_priv_type_4: "可执行的操作：查询、编辑(流程结束后可以修改表单)",
    msg_manage_priv_type_5: "可执行的操作：查询、点评",
    msg_118: "数据处理中请稍候...",
    msg_119: "数据处理完成",
    msg_120: "数据不需要处理，请确认后再操作。",
    msg_121: "请选择要导入的文件！",
    msg_122: "您上传的文件类型为",
    msg_123: "，文件必须为.xls或 .xlsx类型",
    msg_124: "修改字段属性",
    msg_125: "数据源名称不能为空!",
    msg_126: "数据源描述不能为空!",
    msg_127: "数据源名称不能含中文!",
    msg_128: "确认删除符合条件的数据吗？这将不可恢复",
    msg_129: "必选",
    msg_130: "可选",
    msg_131: "停用",
    msg_132: "编辑",
    msg_133: "删除",
    msg_134: "确定删除所选条目吗？",
    msg_135: "模块不能为空！",
    msg_136: "字段不能为空！",
    msg_137: "字段不能为空！",
    msg_138: "插件不能为空！",
    msg_139: "插入成功！",
    msg_140: "更新成功！",
    msg_141: "流程检索...",
    msg_142: "字段名称不能为空",
    msg_143: "字段描述不能为空",
    msg_144: "是",
    msg_145: "文本",
    msg_146: "数字",
    msg_147: "删除",
    msg_148: "确认要删除该字段吗",
    msg_149: "编辑",
    msg_150: "确认要删除该数据源吗？",
    msg_151: "确认要清空该数据源的所有数据吗？",
    msg_152: "请选择附件！",
    msg_153: "您上传的文件类型为",
    msg_154: "，文件必须为.xls或 .xlsx类型",
    msg_155: "请您输入正确的标识符！",
    msg_156: "字段名称不能重复！",
    msg_157: "请选择管理员！",
    msg_158: "尚无数据源！",
    msg_159: "设置成功！",
    msg_160: "数据源名称不能含空格！",
    msg_161: "编辑",
    msg_162: "类型为文本不能作为唯一字段",
    msg_163: "数据源标示符已存在！",
    msg_164: "创建数据源成功！",
    msg_165: "确认要删除该表单吗？这将删除表单描述与字段设置且不可恢复！",
    msg_166: "删除成功！",
    msg_167: "您当前目录下没有表单，",
    msg_168: "请创建表单",
    msg_169: "请稍等...",
    msg_170: "确定要导出此表单吗？",
    msg_171: "全部",
    msg_172: "单击进入下级目录",
    msg_173: "没有与搜索条件匹配的项，",
    msg_174: "该分类下存在表单,请先删除表单再删除分类",
    msg_175: "未分类是系统定义的关键字，请重新输入！",
    msg_intelligent_1: "是否允许修改主办人相关选项及默认经办人：",
    msg_intelligent_2: "是否允许修改主办人相关选项：",
    msg_176: "端口必须为4位整型",
    msg_177: "超时前提醒时间必须为整型",
    msg_178: "超时后提醒时间必须为整型",
    msg_179: "请选择批量设置的流程步骤！",
    msg_180: "删除后将不可恢复，确认删除请输入大写字母“OK”",
    msg_181: "确认要删除所有流程日志吗？",
    msg_182: "确认要删除所有管理日志吗？",
    msg_183: "该分类存在子分类，请先删除所有子分类！",
    msg_184: "该分类下存在流程,请先删除流程再删除分类",
    msg_185: "表单分类排序号不能超过六位",
    msg_186: "流程分类排序号不能超过六位",
    msg_187: "您已经填写了部分信息,需要保存吗?",
    msg_188: "您已经签章，请先删除已有签章！",
    msg_189: "手写签章加载失败，请检查控件是否正确安装！",
    msg_190: "条",
    msg_191: "请输入英文字母或数字！",
    msg_192: "您当前目录下没有流程或者未设置新建权限",
    msg_193: "字段名称必须是字母、下划线或数字和字母组合！",
    msg_194: "新建数据源至少添加一条字段！",
    msg_195: "导入失败！",
    msg_196: "字段名称不能含中文!",
    msg_197: "请输入正确的字段类型！",
    msg_198: "否",
    msg_199: "至少保留一个字段！",
    msg_200: "字段名称不能是纯数字！",
    msg_201: "字段名称不能含特殊字符！",
    msg_202: "您确认放弃当前填写信息并关闭当前窗口吗?",
    msg_203: "输入值有重复！",
    msg_204: "确认要收回此工作吗？",
    msg_205: "邮箱格式不正确。",
    msg_206: "提示",
    msg_207: "导出-待办工作",
    msg_208: "导出-关注工作",
    msg_209: "导出-挂起工作",
    msg_210: "导出-办结工作",
    msg_211: "成功关注此工作！",
    msg_212: "您已经关注了此工作，无法再次关注！",
    msg_213: "导出-全部工作",
    msg_214: "导出-委托工作",
    msg_215: "全部工作",
    msg_216: "请填写相关人员",
    msg_217: "工作挂起成功",
    msg_218: "确认要转存此工作内容文件吗？",
    msg_219: "确认要归档到档案管理吗？",
    msg_220: "请填写要转交的人员信息",
    msg_221: "您未输入值！",
    msg_222: "字段描述:",
    msg_223: "该字段设置成唯一标识,不能输入空值！",
    msg_224: "字段名称:",
    msg_225: "该字段设置成唯一标识,输入值不能重复！",
    msg_227: "▲",
    msg_228: "·下一步骤：",
    msg_229: "您没有此权限!",
    msg_230: "挂起失败，流程步骤不存在!",
    msg_231: "挂起失败，步骤已经执行完成!",
    msg_232: "挂起失败，步骤已经挂起!",
    msg_233: "挂起失败，当前步骤是自由流程预设步骤!",
    msg_234: "挂起失败，执行操作人不是当前办理人不允许执行挂起操作!",
    msg_235: "挂起失败，数据异常请联系管理中!",
    msg_236: "条件符合",
    msg_237: "条件不符",
    msg_238: "符合条件公式",
    msg_239: "不符合条件公式",
    msg_240: "序号",
    msg_241: "选择结束请点击结束流程",
    msg_242: "此步骤为强制并发",
    msg_243: "经办人[ %s ]尚未办理完毕，不能转交流程！",
    msg_244: "请指定好所选步骤的主办人",
    msg_245: "请指定好所选步骤的经办人",
    msg_246: "成功发送催办信息",
    msg_247: "您无权更改此步骤默认人员",
    msg_248: "您无权更改主办人相关选项",
    msg_249: "请选择要转交的下一步骤",
    msg_250: "确定要结束流程吗？",
    msg_251: "主办人：",
    msg_252: "先接收者主办：",
    msg_253: "无主办人会签：",
    msg_254: "新建工作",
    msg_255: "请至少选择一个退回步骤！",
    msg_256: "流程退回成功 ",
    msg_257: "您确认保存编辑内容吗？",
    msg_258: "工作流委托提醒：",
    msg_259: "您有新的工作需要办理",
    msg_260: "工作已结束",
    msg_261: "经办人[ %s ]尚未办理完毕，确定要转交下一步吗？",
    msg_262: "添加会签人操作成功",
    msg_263: "，其中[ %s ]添加成功",
    msg_264: "，[ %s ]已经是本步骤的办理人不需要添加",
    msg_265: "添加会签人操作失败",
    msg_266: "确定要强制转交下一步吗？",
    msg_267: "返回待办工作",
    msg_268: "返回",
    msg_269: "保存返回待办工作",
    msg_270: "保存返回",
    msg_271: "修改成功！",
    msg_272: "确认要销毁当前查询出的所有工作吗？",
    msg_273: "此步骤属于强制并发，您还有没选择的分支步骤！",
    msg_274: "动态转交步骤名称不能为空！",
    msg_275: "数据源名称不能超过40个字符！",
    msg_276: "字段名称不能超过40个字符！",
    msg_277: "确认要销毁当前所选的工作吗？",
    msg_278: "确定要删除当前查询出的所有委托规则吗？",
    msg_279: "确定要删除当前所选的委托规则吗？",
    msg_280: "确认要还原当前查询出的所有工作吗？",
    msg_281: "确认要还原当前所选的工作吗？",
    msg_282: "确认要将所选工作恢复到执行中吗？",
    msg_283: "确认还原请输入大写字母“OK”",
    msg_284: "请填写批注内容！",
    msg_285: "退回意见不能为空",
    msg_286: "工作名称或文号不能为空",
    msg_287: "请指定发起范围！",
    msg_288: "此工作第一步骤有触发器操作，确定进入新建向导？",
    msg_289: "您的设置中有批量清空经办人的操作，是否继续？",
    msg_290: "确定要执行一键转交操作？",
    msg_291: "请输入催办内容",
    msg_292: "提醒您尽快办理流水号：%s,流程名：%s的工作",
    msg_293: "不符合一键转交的条件",
    msg_294: "没有此工作的办理权限",
    msg_295: "请选择科目",
    msg_296: "请选择借/贷",
    msg_297: "请填写金额",
    msg_298: "请保持记账信息的借贷平衡！",
    msg_299: "请选择业务日期",
    msg_300: "请选择日期",
    msg_301: "请选择凭证字",
    msg_302: "请填写附件数",
    msg_303: "请填写序号",
    msg_304: "请选择凭证类别",
    msg_305: "请选择制单日期",
    msg_306: "请选择审核日期",
    msg_307: "金额必须为数字",
    msg_308: "扩展控件JS加载失败，请检查后再次尝试！",
    msg_309: "附件数必须为大于0数字",
    msg_310: "序号必须为大于0数字",
    msg_311: "附件数开头不能为0",
    msg_312: "序号开头不能为0",
    msg_313: "请选择摘要",
    msg_314: "工作已恢复"
};

td_lang.system = {

};
td_lang.system.workflow = {
    msg_2: "步骤基本属性",
    msg_3: "经办权限",
    msg_4: "可写字段",
    msg_5: "保密字段",
    msg_6: "条件设置",
    msg_7: "克隆该步骤",
    msg_8: "删除该步骤",
    msg_9: "新建步骤",
    msg_10: "保存布局",
    msg_11: "刷新视图",
    msg_12: "确认要删除该步骤么？",
    msg_13: "确认要克隆该步骤么？",
    msg_14: "条件公式左右小括号个数不相等！",
    msg_15: "条件公式左右中括号个数不相等！",
    msg_16: "条件公式左右大括号个数不相等！",
    msg_17: "全选",
    msg_18: "取消",
    msg_19: "流程名称不能为空！",
    msg_20: "表单不能为空！",
    msg_21: "流程分类不能为空！",
    msg_22: "流程类型不能为空！",
    msg_23: "流程排序号必须为整数",
    msg_24: "编号计数器必须为整数",
    msg_25: "编号位数必须为整数",
    msg_prcs_1: "步骤序号不能为空！",
    msg_prcs_2: "步骤名称不能为空！",
    msg_prcs_3: "请设置经办权限！",
    msg_prcs_4: "流程步骤序号：%s 已经存在，流程步骤序号不能重复！",
    msg_prcs_5: "子流程类型不能为空！",
    msg_prcs_6: "请选择返回步骤",
    msg_prcs_7: "插件信息保存失败",
    msg_26: "模板名称不能为空！",
    msg_27: "条件重复！",
    msg_28: "值中不能含有单引号",
    msg_29: "流程步骤不能为空！",
    msg_30: "流程设计器",
    msg_31: "人员不能为空！",
    msg_32: "所管部门不能为空！",
    msg_33: "确定删除该报表权限吗？",
    msg_34: "所属流程不能为空！",
    msg_35: "报表名称不能为空！",
    msg_36: "该模板名称已存在！",
    msg_37: "该表单名称已存在！",
    msg_38: "请填加发起范围！",
    msg_39: "流水号%s未能结束！您没有此权限",
    msg_40: "流水号%s未被删除！您没有此权限",
    msg_41: "映射关系[%s]已存在！",
    msg_basis: "基本设置",
    msg_operator: "经办人",
    msg_intelligent: "智能选人",
    msg_circulation: "流转设置",
    msg_writable: "可写字段",
    msg_hidden: "保密字段",
    msg_condition: "条件设置",
    msg_limit: "办理时限",
    msg_unit: "触发器",
    msg_remind: "提醒设置",
    msg_aip: "呈批单设置",
    msg_42: "保存失败！发现编号重复的控件！\n\n",
    msg_43: "当前的控件信息：%s控件名称：%s，控件类型：%s，控件编号：%s%s",
    msg_44: "重复的控件信息：%s控件名称：%s，控件类型：%s，控件编号：%s%s",
    msg_45: "当前的控件信息：%s控件名称：%s，控件类型：%s，控件编号：%s%s",
    msg_46: "重复的控件信息：%s控件名称：%s，控件类型：%s，控件编号：%s%s",
    msg_47: "保存失败！发现名称重复的控件！\n\n",
    msg_48: "控件名称: %s 的下拉选项不可多于",
    msg_49: "",
    msg_50: "未知控件",
    msg_51: "表单内容不能为空！",
    msg_52: "请先选择子流程类型",
    msg_53: "请先选择流程字段",
    msg_54: "删除映射",
    msg_55: "当前日历控件：%s未找到有效输入框控件：%s",
    msg_56: "您选择的表单数据控件与系统数据存在差异，请在表单设计器中重新填写！",
    msg_57: "此字段已添加"
};

td_lang.pda = {
    msg_1: "暂无更多信息"
};

td_lang.crm = {

};

td_lang.crm.apps = {
    update_1: "升级程序将自动备份2010版数据！%s点击确认继续下一步",
    update_2: "升级过程较长，请耐心等待，请勿关闭本页面或关闭浏览器！%s点击确认继续下一步",
    update_3: "数据升级已成功完成!%s是否立即重新分配权限？",
    email: "不是一个有效的邮件地址！",
    phone: "不是一个有效的电话号码！",
    url: "不是一个有效的网址",
    date: "不是一个有效的日期！（例如：2011-05-15）",
    datetime: "不是一个有效的日期时间！（例如：2011-05-15 10:58:00）",
    time: "不是一个有效的时间！（例如：10:58:00）",
    int: "不是一个有效的整数！",
    float: "不是一个有效的浮点数！",
    money: "不是一个有效的金额！",
    percent: "不是一个有效的百分数！",
    notnull: "%s:不能为空！",
    undefined: "错误：[%s]类型验证表达式未定义！",
    length_over: "%s:长度大于%s位！",
    msg_1: "%s:必须为正数！（不能为负数或零）",
    msg_2: "%s:必须为非负数！",
    msg_3: "%s:不能超过%s位有效数字！",
    msg_4: "%s:小数点后不能超过%s位有效数字！",
    msg_5: "Excel文件只能为xls,xlsx格式",
    msg_6: "请选择要导入的文件！",
    msg_7: "没有输入正则表达式！",
    msg_8: "其他",
    msg_9: "身份证验证",
    msg_10: "不验证",
    msg_11: "电话验证",
    msg_12: "手机验证",
    msg_13: "网址验证",
    msg_14: "邮件验证",
    msg_15: "不是一个有效的电话号码！",
    msg_16: "手机号码输入有误！",
    msg_17: "身份证输入有误！",
    msg_18: "网址输入有误！",
    msg_19: "邮件输入有误！",
    msg_20: "输入有误！",
    msg_21: "身份证号不能为空，请重新输入！",
    msg_22: "身份证号位数不对，请重新输入！",
    msg_23: "身份证号不正确，请重新输入！",
    msg_24: "第%s个条件不完整！",
    msg_25: "第%s个条件不能为空！",
    msg_26: "第%s个条件的第一个时间不能大于第二个时间",
    msg_27: "第%s个条件的值不能含有特殊字符",
    msg_28: "添加条件",
    msg_29: "添加分组",
    msg_30: "选择关系：",
    msg_31: "与",
    msg_32: "或",
    msg_33: "查询",
    msg_34: "重置",
    msg_35: "未设置图表。",
    msg_36: "第%s个条件",
    msg_37: "不能为空！",
    msg_38: "的第一个时间不能大于第二个时间",
    msg_39: "的值不能含有特殊字符",
    msg_40: "减少分组",
    msg_41: "过滤分组",
    msg_42: "运行时查询",
    msg_43: "并且",
    msg_44: "或者",
    msg_45: "空",
    msg_46: "错误编号：",
    msg_47: "错误原因：",
    msg_48: "保存失败！",
    msg_49: "添加图片",
    msg_50: "是否确认删除？",
    msg_51: "删除失败！未找到附件！",
    msg_52: "请先选择",
    msg_53: "功能完善中，稍后开放",
    msg_54: "请先选择一条记录",
    msg_55: "执行权限与分配权限不相符，无法操作",
    msg_56: "请至少选择一条记录",
    msg_57: "存在执行权限与分配权限不相符的记录，无法操作",
    msg_58: "请选择一条记录！",
    msg_59: "未获取到指定模块的路径",
    msg_60: "确定要删除选中的记录吗？",
    msg_61: "该动作只支持单条记录！",
    msg_62: "确定要恢复所选数据吗？",
    msg_63: "恢复成功",
    msg_64: "确定要删除该视图吗？",
    msg_65: "快速新建",
    msg_66: "第%s行中字段条件或字段值未指定",
    msg_67: "百度地图地址查询",
    msg_68: "表达式：",
    msg_69: "%s:长度大于%s位！请联系管理员！",
    msg_70: "%s:必须为负数！（不能为正数或零）",
    msg_71: "确定要删除当前记录吗？"
};

td_lang.crm.inc = {
    msg_1: " 不能为空",
    msg_2: "无效 ",
    msg_3: "请选择一条记录编辑!",
    msg_4: "请仅选择一条记录编辑!",
    msg_5: "请仅选择一条记录!",
    msg_6: "请选择一条记录删除!",
    msg_7: "请至少选择一条记录!",
    msg_8: "没有匹配到N!",
    msg_9: "匹配错误!",
    msg_10: "有多个N!",
    msg_11: "不符合数字格式",
    msg_12: "不符合整数格式！",
    msg_13: "不符合浮点数格式！",
    msg_14: "不符合金额格式！",
    msg_15: "不符合日期格式！",
    msg_16: "不符合时间格式！",
    msg_17: "不符合日期时间格式！",
    msg_18: "不符合身份证号格式！",
    msg_19: "不符合邮箱地址格式！",
    msg_20: "不符合网络地址格式！",
    msg_21: "不符合邮政编码格式！",
    msg_22: "不符合电话号码格式！",
    msg_23: "不符合手机号码格式！",
    msg_24: "小数点后只能保留两位有效数字！",
    msg_25: "身份证格式不正确",
    msg_26: "请正确输入页数",
    msg_27: "请输入1-%s之间的数值",
    msg_28: "初始模块失败",
    msg_29: "请选择对应供应商",
    msg_30: "请选择对应客户",
    msg_31: "您的浏览器不支持AJAX！",
    msg_32: "本操作不能选择一条以上的记录!",
    msg_33: "合同的当前阶段不允许收款!",
    msg_34: "请至少选择一条记录来操作!",
    msg_35: "确定要删除选中的纪录？",
    msg_36: "合同的当前阶段不允许删除!",
    msg_37: "等于",
    msg_38: "不等于",
    msg_39: "开始为",
    msg_40: "结尾为",
    msg_41: "包含",
    msg_42: "不包含",
    msg_43: "小于",
    msg_44: "大于",
    msg_45: "小于或等于",
    msg_46: "大于或等于",
    msg_47: "不支持XMLDOM对象",
    msg_48: "加载中...",
    msg_49: "加载失败",
    msg_50: "不能解析XML文档",
    msg_51: "数量不能为空",
    msg_52: "请正确输入数量的值",
    msg_53: "单价不能为空",
    msg_54: "请正确输入价格的值",
    msg_55: "产品明细",
    msg_56: "操作",
    msg_57: "添加产品",
    msg_58: "总计",
    msg_59: "浏览器不支持.",
    msg_60: "加载中，请稍候……",
    msg_61: "无法创建 XMLHttpRequest 对象！",
    msg_62: "序号",
    msg_63: "确定要清空%s列表吗？",
    msg_64: "为空",
    msg_65: "不为空",
    msg_66: "是其中之一",
    msg_67: "不是其中之一",
    msg_68: "在之间",
    msg_69: "昨天",
    msg_70: "今天",
    msg_71: "明天",
    msg_72: "上周",
    msg_73: "本周",
    msg_74: "下周",
    msg_75: "上月",
    msg_76: "本月",
    msg_77: "下月",
    msg_78: "过去7天",
    msg_79: "过去30天",
    msg_80: "过去60天",
    msg_81: "过去90天",
    msg_82: "未来7天",
    msg_83: "未来30天",
    msg_84: "未来60天",
    msg_85: "未来90天",
    msg_86: "7天之前",
    msg_87: "30天之前",
    msg_88: "60天之前",
    msg_89: "90天之前",
    msg_90: "过去15天",
    msg_91: "未来15天",
    msg_92: "15天之前",
    msg_93: "当前用户",
    msg_94: "当前部门",
    msg_95: "今天之前"
};

td_lang.crm.studio = {
    chart_1: "无图表",
    chart_2: "柱图",
    chart_3: "多系列柱图",
    chart_4: "三维柱图",
    chart_5: "多系列三维柱图",
    chart_6: "饼图",
    chart_7: "三维饼图",
    chart_8: "环图",
    chart_9: "曲线图",
    chart_10: "多系列曲线图",
    chart_11: "横向柱图",
    chart_12: "X轴",
    chart_13: "Y轴",
    chart_14: "分组",
    chart_15: "数据",
    msg_1: "确定要放弃当前步骤吗?",
    msg_2: "子菜单代码为必填项",
    msg_3: "子菜单代码只能为数字类型",
    msg_4: "子菜单代码必须为两位",
    msg_5: "菜单名称为必填项",
    msg_6: "模块名称为必填项",
    msg_7: "模块名称为必填项",
    msg_8: "主字段名为必填项",
    msg_9: "主字段类型为必填项",
    msg_10: "移出区域",
    msg_11: "添加字段",
    msg_12: "%s:必须填写!",
    msg_13: "只读",
    msg_14: "推荐填写",
    msg_15: "必须填写",
    msg_16: "不限制",
    msg_17: "添加",
    msg_18: "区域名称",
    msg_19: "全选",
    msg_20: "确定",
    msg_21: "请选择添加的字段!",
    msg_22: "取消",
    msg_23: "是否确认禁用字段“%s”？",
    msg_24: "确定要删除该模块吗?",
    msg_25: "请输入删除密码--",
    msg_26: "输入密码不对",
    msg_27: "中指定部门未选择,请检查!",
    msg_28: "请至少选择一个角色！",
    msg_29: "请填写模板名称",
    msg_30: "填写的模板名称中不能含有特殊字符",
    msg_31: "未知的模块对象！",
    msg_32: "所选元素己在第一位",
    msg_33: "所选元素己在最后一位",
    msg_34: "存在不可移动的字段！",
    msg_35: "字段“%s”禁用失败！请联系管理员！",
    msg_36: "是否确认取消？",
    msg_37: "字段名称不能为空！",
    msg_38: "请选择字段主类型！",
    msg_39: "请选择字段子类型！",
    msg_40: "请%s！",
    msg_41: "存在重复的字段名称",
    msg_42: "最大长度不能为空！",
    msg_43: "小数精度不能为空！",
    msg_44: "选项模板不能为空！",
    msg_45: "显示格式不能为空！",
    msg_46: "初始编号不能为空！",
    msg_47: "编号间隔不能为空！",
    msg_48: "编号位数不能为空！",
    msg_49: "编号位数不能为零！",
    msg_50: "请选择子类型",
    msg_51: "请先选择选项模板！",
    msg_52: "请先选择引用模块！",
    msg_53: "请先选择列表视图模板！",
    msg_54: "表达式{N}必须在显示格式的最末尾!",
    msg_55: "存在多个表达式{N}!",
    msg_56: "显示格式已变更！是否重置编号？（新建记录将从初始编号记起）",
    msg_57: "请选择模块！",
    msg_58: "动作序号不能为空",
    msg_59: "动作编号不能为空",
    msg_60: "显示名称不能为空",
    msg_61: "内部名称不能为空",
    msg_62: "是否确认启用字段“%s”？",
    msg_63: "字段“%s”启用失败！请联系管理员！",
    msg_64: "请选择主字段",
    msg_65: "请选择联动字段",
    msg_66: "无可以删除的数据",
    msg_67: "无可以恢复的数据",
    msg_68: "确定要恢复所有数据吗?",
    msg_69: "无数据记录",
    msg_70: "视图名称为必填项",
    msg_71: "第%s行中字段或排序方式未指定",
    msg_72: "配色字段'%s'在视图字段中未找到,请确证该字段是否在视图显示字段中",
    msg_73: "第%s行中字段或条件或字段值或配色未指定",
    msg_74: "字段列表",
    msg_75: "主类型",
    msg_76: "子类型",
    msg_77: "字段名称",
    msg_78: "减少字段",
    msg_79: "模块名称不能为空!",
    msg_80: "子菜单代码不能为空!",
    msg_81: "字段名称不能为空!",
    msg_82: "第一个字段为主显示字段，类型必须'文本'!",
    msg_83: "请填写报表名称",
    msg_84: "填写的报表名称中不能含有特殊字符",
    msg_85: "请选择汇总方式。",
    msg_86: "请选择汇总字段。",
    msg_87: "汇总项重复，请检查。",
    msg_88: "第",
    msg_89: "条汇总方式",
    msg_90: "请选择报表类型",
    msg_91: "的显示名称中不能含有特殊字符",
    msg_92: "条字段",
    msg_93: "请填写行第一分组.",
    msg_94: "请填写列第一分组.",
    msg_95: "请填写第一分组.",
    msg_96: "行第",
    msg_97: "列第",
    msg_98: "分组",
    msg_99: "分组依据重复，请检查。",
    msg_100: "请选择一个报表类型",
    msg_101: "字段重复设置，请检查",
    msg_102: "默认值长度大于%s",
    msg_103: "字段长度至少比小数位数大2",
    msg_104: "取消选择",
    msg_105: "反选",
    msg_106: "系统自带视图模板不允许删除！"

};

td_lang.crm.platform = {
    msg_1: "数据升级中，请耐心等候...",
    msg_2: "未找到目标步骤！",
    msg_3: "上一步",
    msg_4: "下一步",
    msg_5: "保存",
    msg_6: "取消",
    msg_7: "显示以下桌面模块",
    msg_8: "排序",
    msg_9: "置顶",
    msg_10: "置底",
    msg_11: "上移",
    msg_12: "下移",
    msg_13: "全选",
    msg_14: "存在相同的%s--%s选项",
    msg_15: "存在相同的选项值%s",
    msg_16: "未能引入事件JS",
    msg_17: "左移",
    msg_18: "右移"


};
td_lang.general.project = {
    msg_1: "项目中心",
    msg_2: "项目树型图",
    msg_3: "任务中心",
    msg_4: "所有项目",
    msg_5: "项目监控",
    msg_6: "项目变更"
};
td_lang.general.project.button = {
    msg_1: "创建新项目",
    msg_2: "刷新"
};
td_lang.general.project.msg = {
    msg_1: "无项目",
    msg_2: "请输入关键词...",
    msg_3: "确认要删除所选项目吗？",
    msg_4: "要删除项目，请至少选择其中一项。",
    msg_5: "所选项目已全部删除",
    msg_6: "确认要结束此项目吗？",
    msg_7: "该项目还有尚未结束的任务，是否强制结束？",
    msg_8: "确认要恢复执行此项目吗？"
};
td_lang.general.project.guide = {
    attribute: "立项及预算",
    user: "填写干系人",
    task: "第一个任务",
    file_sort: "第一个文档目录",
    diy: "自定义字段",
    approve: "项目审批人",
    no_null: "必填项目不能为空",
    time: "项目计划周期的结束时间不能小于开始时间！",
    number: "请输入有效数字!"
};

td_lang.general.taskcenter = {
    delay: "推迟",
    ignore: "忽略",
    reborn: "恢复",
    deleted: "删除",
    notask: "暂无任务"
};

td_lang.general.itask = {
    msg_1: "正在移动一个任务",
    msg_2: "错误：非法请求"
};

td_lang.general.itask.gantt = {
    January: "一月",
    February: "二月",
    March: "三月",
    April: "四月",
    May: "五月",
    June: "六月",
    July: "七月",
    August: "八月",
    September: "九月",
    October: "十月",
    November: "十一月",
    December: "十二月",
    Sunday: "日",
    Monday: "一",
    Tuesday: "二",
    Wednesday: "三",
    Thursday: "四",
    Friday: "五",
    Satday: "六",
    wait: "请稍候..."
};

td_lang.ispirit = {
    label_menu: "菜单",
    label_workflow: "工作流",
    label_calendar: "日程安排",
    label_search_help: "搜索在线帮助",
    label_search_workflow: "搜索工作流文号",
    label_search_calendar: "搜索日程安排",
    label_no_data: "无符合条件的数据",
    label_prcs_no: "第%s步"
};

td_lang.office_product = {
    msg1: "新建办公用品库",
    msg2: "编辑办公用品库",
    msg3: "删除库会导致库里的办公用品类别也被删除，是否继续？",
    msg4: "办公用品库名称不能为空",
    msg5: "所属部门不能为空",
    msg6: "库管理员不能为空",
    msg7: "物品调度员不能为空",
    msg8: "办公用品名称不能为空",
    msg9: "办公用品名库不能为空",
    msg10: "办公用品类别不能为空",
    msg11: "当前库存不能为空",
    msg12: "当前库存必须为数字",
    msg13: "最低警戒库存必须为数字！",
    msg14: "最高警戒库存必须为数字！",
    msg15: "最低警戒库存不能大于当前库存！",
    msg16: "最高警戒库存不能小于当前库存！",
    msg17: "物品单价必须为数字！",
    msg18: "办公用品库名称重复！"
};

td_lang.validation = {
    required_1: "此处不可空白",
    required_2: "请选择一个项目",
    required_3: "您必须钩选此栏",
    required_4: "日期范围不可空白",
    dateRange_1: "无效的 ",
    dateRange_2: " 日期范围",
    dateTimeRange_1: "无效的 ",
    dateTimeRange_2: " 时间范围",
    minSize_1: "最少 ",
    minSize_2: " 个字符",
    maxSize_1: "最多 ",
    maxSize_2: " 个字符",
    groupRequired: "你必需选填其中一个栏位",
    min: "最小值为",
    max: "最大值为",
    past: "日期必需早于",
    future: "日期必需晚于 ",
    maxCheckbox_1: "最多选取 ",
    maxCheckbox_2: " 个项目 ",
    minCheckbox_1: "请选择 ",
    minCheckbox_2: " 个项目 ",
    equals: "请输入与上面相同的密码",
    creditCard: "无效的信用卡号码 ",
    phone: "无效的电话号码",
    email: "邮件地址无效",
    integer: "不是有效的整数",
    number: "无效的数字",
    date: "无效的日期，格式必需为 YYYY-MM-DD",
    ipv4: "无效的 IP 地址",
    url: "无效的 URL ",
    path: "无效的路径 ",
    nonNegative: "只能填非负数 ",
    money: "请输入正确金额：0.00 ",
    onlyNumberSp: "只能填数字 ",
    onlyLetterSp: " 只接受英文字母大小写 ",
    onlyLetterAccentSp: "只接受英文字母大小写",
    onlyLetterNumber: "不接受特殊字符",
    ajaxUserCall_1: "此名称已被其他人使用 ",
    ajaxUserCall_2: "正在确认名称是否有其他人使用，请稍等。",
    ajaxUserCallPhp_1: "此帐号名称可以使用",
    ajaxUserCallPhp_2: "此名称已被其他人使用",
    ajaxUserCallPhp_3: "正在确认帐号名称是否有其他人使用，请稍等。",
    ajaxNameCall_1: "此名称可以使用",
    ajaxNameCall_2: "此名称已被其他人使用",
    ajaxNameCall_3: "正在确认名称是否有其他人使用，请稍等。 ",
    ajaxNameCallPhp_1: "此名称已被其他人使用 ",
    ajaxNameCallPhp_2: " 正在确认名称是否有其他人使用，请稍等。 ",
    validate2fields: "请输入 HELLO",
    dateFormat: "无效的日期格式 ",
    dateTimeFormat_1: "无效的日期或时间格式",
    dateTimeFormat_2: "可接受的格式：",
    dateTimeFormat_3: "mm/dd/yyyy hh:mm:ss AM|PM 或 ",
    dateTimeFormat_4: "yyyy-mm-dd hh:mm:ss AM|PM"
}

