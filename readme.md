分析整体项目需求，确定功能，必须的界面以及跳转的页面，需要的数据以及数据来源格式，是否需要本地数据库和服务器支持，是否需要后台服务等；分析页面有些什么功能，页面有：首页、搜索页、详情页、分类页、购物车、我的，跳转我的页面需要做注册、登录，我的页面里面有地址管理，添加地址等；
717这套项目是用react开发的，会用到redux、react-router、react-redux、redux-saga等，还有mobile端自适应，fetch等，还会用node去搭建一个简单的静态服务器，准备一定的模拟接口；搭建可以切换不同环境的脚手架。有common封装组件、弹出框、轮播图模块、商品模块、筛选模块、购物车商品某块、邮寄地址模块等。
配置脚手架的时候，可能会遇到版本号不同就报错的原因，必要的时候下载包的时候可以带着版本号一起下载。process.cwd()是获取当前程序运行的目录。
配置完脚手架，分析页面需要几级路由，然后配置路由界面，首页、分类页、购物车、我的这些是一级路由，用Navlink有个好处就是可以加样式；二级路由就是这些页面的内容。封装一个$http用来请求数据，同源策略就是协议相同，域名相同，端口号相同；
首页：头部搜索框获取到焦点的时候，跳转到搜索页；接下来是用封装一个swiper组件写轮播图；列表用http.request跨域请求在线数据；redux流实现数据的获取；
分类：上面有一个搜索，左边是一个列表，右边是显示的数据；
购物车：要判断是否登录，如果没有登录需要重定向，跳转到登录路由；进入到购物车之后去服务器请求购物车的数据，将购物车的数据存到store中，功能性效果，比如加减和选中商品，都是同store的数据管理的，在请求回来的购物车数据中追加count和selected，为了实现数据驱动视图的目的，实现前端的展示效果；点击编辑，请求后端接口传要删除的商品的id、token，删除成功后返回成功的信息和最新的购物车的数据，前端在根据新数据更新store；点击结算时，跳转到支付平台；
我的页面：判断是否登录，如果没有登录需要重定向到登录页面；点击设置跳到设置页面，可以退出登录状态；识别用户信息，并显示当前的用户信息；点击地址管理跳到deliveryList页面，添加地址的时候，跳转到consignee页面，填写完信息，点击保存跳转到deliverylist页面，信息保存到delivery.json中；请求数据渲染出来；