import{_ as s,r,o as t,c as p,a as e,b as o,d as i,w as l,e as c}from"./app-697cd87e.js";const u={},h=e("h1",{id:"faq",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#faq","aria-hidden":"true"},"#"),o(" FAQ")],-1),m={class:"custom-container tip"},v=e("p",{class:"custom-container-title"},"TIP",-1),b=e("p",null,"该Q&A文档会持续更新，非常欢迎您的建议与共建！",-1),g={class:"table-of-contents"},_=c(`<h2 id="server常见问题与处理方法" tabindex="-1"><a class="header-anchor" href="#server常见问题与处理方法" aria-hidden="true">#</a> Server常见问题与处理方法</h2><h3 id="_1-环境部署" tabindex="-1"><a class="header-anchor" href="#_1-环境部署" aria-hidden="true">#</a> 1. 环境部署</h3><h4 id="_1-1-pypi下载超时或失败" tabindex="-1"><a class="header-anchor" href="#_1-1-pypi下载超时或失败" aria-hidden="true">#</a> 1.1 pypi下载超时或失败</h4><p>如果在执行<code>pip install</code>环节出现以下错误，可以调整一下镜像源：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by &#39;ReadTimeoutError(&quot;HTTPSConnectionPool(host=&#39;files.pythonhosted. org&#39;, port=443): Read timed out.(read timeout=15)&quot;) &#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该错误是访问官方<code>pypi</code>下载源时网络不通或者不稳定导致，可以通过以下方式调整：</p><p>本地部署时，调整<code>pypi</code>下载源配置方式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>mkdir ~/.pip/
echo &quot;[global]\\nindex-url = https://mirrors.cloud.tencent.com/pypi/simple&quot; &gt;&gt; ~/.pip/pip.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Docker-Compose部署时，调整<code>pypi</code>下载源配置方式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>vi server/dockerconfs/Dockerfile-common
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>调整文件中最后一行 <code>RUN</code>指令</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>RUN mkdir -p log/ &amp;&amp; \\
    mkdir ~/.pip/ &amp;&amp; \\
    echo &quot;[global]\\nindex-url = https://mirrors.cloud.tencent.com/pypi/simple&quot; &gt;&gt; ~/.pip/pip.conf &amp;&amp; \\
    pip install -U setuptools pip &amp;&amp; \\
    pip install -r requirements.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注：如果需要指定其他<code>pypi</code>下载源，可以将<code>https://mirrors.cloud.tencent.com/pypi/simple</code>进行替换</p><p>如果出现以下错误：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>WARNING: Retrying (Retry(total=4, connect=None, read=None, redirect=None, status=None)) after connection broken by &#39;NewConnectionError(&#39;&lt;pip._vendor.urllib3.connection.HTTPSConnection object at 0x7f6d4ac24910&gt;: Failed to establish a new connection: [Errno -3] Temporary failure in name resolution&#39;)&#39;: /simple/setuptools/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该错误是无法正常解析<code>pypi</code>访问域名，需要检查一下本地的dns配置是否正常</p><h4 id="_1-2-docker未安装或版本过低" tabindex="-1"><a class="header-anchor" href="#_1-2-docker未安装或版本过低" aria-hidden="true">#</a> 1.2 Docker未安装或版本过低</h4><p>TCA Server使用Docker-Compose依赖的Docker版本需要是<code>1.13.0</code>及以上，可以执行以下命令查看Docker版本</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ docker --version
Docker version 18.09.7, build 2d0083d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>文档相关：</p>`,20),f={href:"https://docs.docker.com/compose/compose-file/compose-versioning/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://docs.docker.com/engine/install/centos/",target:"_blank",rel:"noopener noreferrer"},y={href:"https://docs.docker.com/engine/install/ubuntu/",target:"_blank",rel:"noopener noreferrer"},k=c(`<h4 id="_1-3-docker-compose启动失败" tabindex="-1"><a class="header-anchor" href="#_1-3-docker-compose启动失败" aria-hidden="true">#</a> 1.3 Docker-Compose启动失败</h4><p>如果启动Docker-Compose输出以下错误：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>* Error response from daemon: Error processing tar file(exit status 1): unexpected EOF
* Error response from daemon: Error processing tar file(exit status 1): unexpected EOF
* Error response from daemon: Error processing tar file(exit status 1): unexpected EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题原因：可能镜像构建目录权限不足，导致异常。 解决方案：</p><ol><li>执行<code>docker-compose build</code>可以通过日志查看是哪个镜像构建异常</li><li>切换到具体目录执行<code>docker build .</code>可以看到详细错误信息，结合具体错误信息进行处理</li><li>收集常见的错误日志，整理相关解决方案(注：欢迎大家补充)</li></ol><p>文档相关：</p>`,6),E={href:"https://docs.docker.com/compose/install/",target:"_blank",rel:"noopener noreferrer"},R={href:"https://docs.docker.com/compose/cli-command/",target:"_blank",rel:"noopener noreferrer"},C=c(`<h4 id="_1-4-docker镜像源下载超时或失败" tabindex="-1"><a class="header-anchor" href="#_1-4-docker镜像源下载超时或失败" aria-hidden="true">#</a> 1.4 Docker镜像源下载超时或失败</h4><p>目前TCA基础镜像是使用<code>python:3.7.12-slim</code>，该镜像是基于<code>debian bullseye(debian 11)</code>版本构建的，对应的源需要选择 <code>bullseye</code> 版本的源。</p><p>如果使用默认的下载源会报错或访问速度比较慢，可以调整<code>server/dockerconfs/Dockerfile-common</code>，指定其他国内下载源：</p><div class="language-DockerFile line-numbers-mode" data-ext="DockerFile"><pre class="language-DockerFile"><code># FROM python:3.7.12-slim

# 增加一下内容用于指定下载源
RUN mv /etc/apt/sources.list /etc/apt/sources.list.bak &amp;&amp; \\
    echo &#39;deb http://mirrors.tencent.com/debian/ bullseye main non-free contrib&#39; &gt; /etc/apt/sources.list &amp;&amp; \\
    echo &#39;deb http://mirrors.tencent.com/debian/ bullseye-updates main non-free contrib&#39; &gt;&gt; /etc/apt/sources.list &amp;&amp; \\
    echo &#39;deb http://mirrors.tencent.com/debian-security bullseye-security main non-free contrib&#39; &gt;&gt; /etc/apt/sources.list

# ARG EXTRA_TOOLS=...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果出现以下错误：<code>E: Error, pkgProblemResolver::Resolve generated breaks, this may be caused by held packages</code> 可以做以下检查，确认是什么原因：</p><ol><li>检查一下本地服务器的时间配置是否正常</li><li>调整下载源</li></ol><h4 id="_1-5-python安装或执行失败" tabindex="-1"><a class="header-anchor" href="#_1-5-python安装或执行失败" aria-hidden="true">#</a> 1.5 Python安装或执行失败</h4><p>使用Python执行时提示<code>ImportError: libpython3.7m.so.1.0: cannot open shared object file: No such file or directory</code>，该如何处理</p><ol><li><p>在本地安装Python的目录中查找该文件，比如Python的安装目录是<code>/usr/local/python3</code>，可以执行<code>find /usr/local/python3 -name &quot;libpython3.7m.so.1.0&quot;</code>，确认本地是否存在该文件</p></li><li><p>如果本地存在该文件，则执行以下命令：（注：需要将<code>/usr/local/python3</code>调整为本地实际的Python3安装路径）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code># 链接构建产出的Python动态库
$ ln -s /usr/local/python3/lib/libpython3.7m.so.1.0 /usr/lib/libpython3.7m.so.1.0
# 配置动态库
$ ldconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>如果本地不存在该文件，则可能需要重新安装Python3：（注：以下是将Python安装到<code>/usr/local/python3</code>，可以根据实际情况进行调整）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code># 编译前配置，注意重点：需要加上参数 --enable-shared
$ ./configure prefix=/usr/local/python3 --enable-shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p>文档相关：</p>`,10),T={href:"https://github.com/Tencent/CodeAnalysis/blob/main/doc/references/install_python37_on_centos.md",target:"_blank",rel:"noopener noreferrer"},D={href:"https://github.com/Tencent/CodeAnalysis/blob/main/doc/references/install_python37_on_ubuntu.md",target:"_blank",rel:"noopener noreferrer"},j=c(`<h4 id="_1-6-执行compose-init-sh脚本的pip-install提示sha256不匹配错误" tabindex="-1"><a class="header-anchor" href="#_1-6-执行compose-init-sh脚本的pip-install提示sha256不匹配错误" aria-hidden="true">#</a> 1.6 执行<code>compose_init.sh</code>脚本的<code>pip install</code>提示<code>sha256</code>不匹配错误</h4><p>在构建镜像的<code>pip install</code>步骤提示以下报错时：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ERROR: THESE PACKAGES DO NOT MATCH THE HASHES FROM THE REQUIREMENTS FILE. If you have updated the package versions, please update the hashes. Otherwise, examine the package contents carefully; someone may have tampered with them.
    setuptools from https://mirrors.cloud.tencent.com/pypi/packages/fb/58/9efbfe68482dab9557c49d433a60fff9efd7ed8835f829eba8297c2c124a/setuptools-62.1.0-py3-none-any.whl#sha256=26ead7d1f93efc0f8c804d9fafafbe4a44b179580a7105754b245155f9af05a8:
        Expected sha256 26ead7d1f93efc0f8c804d9fafafbe4a44b179580a7105754b245155f9af05a8
             Got        ddaacc49de5c08c09d744573240a9a49f24f65c5c72380e972433784caa68d98
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以执行<code>export ORIGIN=normal</code>，然后再执行<code>./compose_init.sh</code></p><blockquote><p>注：执行<code>export</code>命令的作用是调整为<code>pypi</code>默认官方下载源进行<code>pip install</code></p></blockquote><h4 id="_1-7-macbook-m1-使用-docker-compose报错" tabindex="-1"><a class="header-anchor" href="#_1-7-macbook-m1-使用-docker-compose报错" aria-hidden="true">#</a> 1.7 MacBook M1 使用 Docker-Compose报错</h4><p>在M1机器上使用默认配置启动docker-compose，会出现<code>mysql</code>和<code>scmproxy</code>服务启动失败，需要做以下两步调整</p><ol><li><p>调整<code>docker-compose.yml</code>文件，修改MySQL的镜像版本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code># 默认：
image: mysql:5.7.24

# 调整后：
image: mariadb:10.5.8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>调整<code>server/dockerconfs/Dockerfile-common</code>文件，修改Python的镜像版本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code># 默认：
FROM python:3.7.12-slim

# 调整后：
FROM amd64/python:3.7.12-slim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h4 id="_1-8-celery、gunicorn命令找不到" tabindex="-1"><a class="header-anchor" href="#_1-8-celery、gunicorn命令找不到" aria-hidden="true">#</a> 1.8 celery、gunicorn命令找不到</h4><p>如果启动服务时，提示：<code>celery could not be found</code>或<code>gunicorn could not be found</code>，需要做以下检查</p><ol><li>执行<code>python -v</code>检查输出，确认当前python版本是否为python3.7</li><li>执行<code>pip install celery</code>和<code>pip install gunicorn</code>检查celery和gunicorn是否已经安装</li><li>如果已经安装，可以执行以下命令建立软链：（注：需要将<code>/usr/local/python3</code>调整为本地实际的Python3安装路径）</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ln -s /usr/local/python3/bin/gunicorn /usr/local/bin/gunicorn
ln -s /usr/local/python3/bin/celery /usr/local/bin/celery
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-服务启动与初始化" tabindex="-1"><a class="header-anchor" href="#_2-服务启动与初始化" aria-hidden="true">#</a> 2. 服务启动与初始化</h3><h4 id="_2-1-服务占用端口异常" tabindex="-1"><a class="header-anchor" href="#_2-1-服务占用端口异常" aria-hidden="true">#</a> 2.1 服务占用端口异常</h4><p>TCA 本地部署启动后，会监听多个端口：</p><ul><li>web服务：80</li><li>nginx服务：8000</li><li>main服务：8001</li><li>analysis服务：8002</li><li>login服务：8003</li><li>file-nginx服务：8004</li><li>file服务：8804</li><li>scmproxy服务：8009</li></ul><p>如果出现端口占用冲突，建议采用以下方式解决：</p><ol><li>调整其他程序监听的端口号，避免跟上述TCA服务的端口号出现冲突</li><li>采用Docker-Compose方式启动TCA，仅监听80端口</li></ol><p>不推荐调整TCA指定服务的端口号，需要调整多处配置，以及可能会影响到后续服务的升级</p><h4 id="_2-2-服务输出日志找不到" tabindex="-1"><a class="header-anchor" href="#_2-2-服务输出日志找不到" aria-hidden="true">#</a> 2.2 服务输出日志找不到</h4><p>本地部署输出的日志位置：</p><ol><li><code>main</code>服务输出的日志目录：<code>server/projects/main/log</code><ul><li>服务启动日志：<code>server/projects/main/log/gunicorn_error.log</code></li><li>服务接收请求日志：<code>server/projects/main/log/gunicorn_access.log</code></li><li>Celery Worker启动日志（处理异步任务）：<code>server/projects/main/nohup_worker.out</code></li><li>Celery Beat启动日志（启动定时任务）：<code>server/projects/main/nohup_beat.out</code></li><li>服务运行日志：<code>server/projects/main/log/codedog.log</code></li><li>Celery Worker运行日志：<code>server/projects/main/log/main_celery.log</code></li><li>Celery Beat运行日志：<code>server/projects/main/log/main_beat.log</code></li></ul></li><li><code>analysis</code>服务输出的日志目录：<code>server/projects/analysis/log</code><ul><li>服务启动日志：<code>server/projects/analysis/log/gunicorn_error.log</code></li><li>Celery Worker启动日志：<code>server/projects/analysis/nohup.out</code></li><li>服务接收请求日志：<code>server/projects/analysis/log/gunicorn_access.log</code></li><li>服务运行日志：<code>server/projects/analysis/log/codedog.log</code></li><li>Celery Worker运行日志（处理结果入库）：<code>server/projects/analysis/log/celery.log</code></li></ul></li><li><code>login</code>服务输出的日志目录：<code>server/projects/login/log</code><ul><li>服务启动日志：<code>server/projects/login/log/gunicorn_error.log</code></li><li>服务接收请求日志：<code>server/projects/login/log/gunicorn_access.log</code></li><li>服务运行日志：<code>server/projects/login/log/codedog.log</code></li></ul></li><li><code>file</code>服务输出的日志目录：<code>server/projects/file/log</code><ul><li>服务启动日志：<code>server/projects/file/log/gunicorn_error.log</code></li><li>服务接收请求日志：<code>server/projects/file/log/gunicorn_access.log</code></li><li>服务运行日志：<code>server/projects/file/log/codedog_file.log</code></li></ul></li><li><code>scmproxy</code>服务输出的日志目录：<code>server/projects/scmproxy/logs</code><ul><li>服务启动日志：<code>server/projects/scmproxy/nohup.out</code></li><li>服务运行日志：<code>server/projects/scmproxy/logs/scmproxy.log</code></li></ul></li></ol><h3 id="_3-平台使用" tabindex="-1"><a class="header-anchor" href="#_3-平台使用" aria-hidden="true">#</a> 3. 平台使用</h3><h4 id="_3-1-平台登录的默认账号密码是什么" tabindex="-1"><a class="header-anchor" href="#_3-1-平台登录的默认账号密码是什么" aria-hidden="true">#</a> 3.1 平台登录的默认账号密码是什么？</h4><p>默认账号: <code>CodeDog</code>，密码: <code>admin</code></p><h4 id="_3-2-平台默认的api-token是什么" tabindex="-1"><a class="header-anchor" href="#_3-2-平台默认的api-token是什么" aria-hidden="true">#</a> 3.2 平台默认的API Token是什么？</h4><p>默认Token是<code>0712b895f30c5e958ec71a7c22e1b1a2ad1d5c6b</code></p><p>如果在平台上刷新了<code>CodeDog</code>用户的Token，需要将刷新后的Token填写到以下文件中：</p><ol><li><code>server/scripts/config.sh</code>文件 <ul><li>更新<code>CODEDOG_TOKEN</code>、<code>FILE_SERVER_TOKEN</code>变量的值（3个位置）</li></ul></li><li><code>server/dockerconfs/.env.local</code>文件 <ul><li>更新<code>CODEDOG_TOKEN</code>、<code>FILE_SERVER_TOKEN</code>变量的值（3个位置）</li></ul></li></ol><p>然后重启服务。</p><ol><li><p>本地部署：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>cd server/
./scripts/deploy.sh start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>docker-compose部署：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ docker-compose stop
# 稍等片刻
$ docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h4 id="_3-3-代码库登记出错-出现代码库及账号不匹配" tabindex="-1"><a class="header-anchor" href="#_3-3-代码库登记出错-出现代码库及账号不匹配" aria-hidden="true">#</a> 3.3 代码库登记出错，出现代码库及账号不匹配</h4><p>该错误出现可能有以下几个原因：</p>`,33),S=e("li",null,"账号密码不准确或登记的代码库地址不存在",-1),N=e("code",null,"github",-1),A={href:"https://github.com/settings/tokens",target:"_blank",rel:"noopener noreferrer"},O=e("code",null,"personal access token",-1),L=c("<li>scmproxy服务启动失败 <ul><li>本地部署：执行<code>ps aux | grep proxyserver</code>看看是否有<code>python proxyserver.py</code>执行进程，如果不存在可以看一下<code>server/projects/scmproxy/nohup.out</code>看看启动失败的原因</li><li>docker-compose部署：在项目根目录执行<code>docker-compose ps</code>看看<code>scmproxy</code>容器是否正常启动，如果没有启动，可以执行<code>docker-compose logs scmproxy</code>看看启动失败的原因</li></ul></li><li>scmproxy所在的机器/容器因为网络问题无法访问对应的代码库 <ul><li>可以手动在机器/容器中执行<code>git clone xxxx</code>（xxx表示待登记的代码库），检查看看是否能够正常拉取</li></ul></li><li>scmproxy所在的机器git版本较低，出现<code>unknown option `local` </code>错误 <ul><li>可以升级机器上的git版本，目前工具支持最低的git版本为<code>1.8.3.1</code></li></ul></li>",3),P=c(`<h4 id="_3-4-查看问题文件提示获取代码信息耗时较久-请稍后再试" tabindex="-1"><a class="header-anchor" href="#_3-4-查看问题文件提示获取代码信息耗时较久-请稍后再试" aria-hidden="true">#</a> 3.4 查看问题文件提示<strong>获取代码信息耗时较久，请稍后再试</strong></h4><p>出现该提示的原因是，代码库偏大或<code>clone</code>代码库时间较长，可以稍等一会再刷新重试</p><h4 id="_3-5-客户端访问文件服务器-提示method-upload-file-call-fails-on-error-expecting-value-line-1-column-1-char-0" tabindex="-1"><a class="header-anchor" href="#_3-5-客户端访问文件服务器-提示method-upload-file-call-fails-on-error-expecting-value-line-1-column-1-char-0" aria-hidden="true">#</a> 3.5 客户端访问文件服务器，提示<code>method(upload_file) call fails on error: Expecting value: line 1 column 1 (char 0)</code></h4><p>出现这种错误，可能是本地配置异常或token配置有问题，检查方式如下：</p><ol><li><p>检查客户端的<code>config.ini</code>文件配置的URL是否为当前Server部署的地址：（xxx需要调整为实际的路径）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>[SERVER_URL]
URL=http://xxx/server/main/
[FILE_SERVER]
URL=http:/xxx/server/files/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果xxx不一致需要调整为一致</p><blockquote><p>注: xxx地址与在浏览器访问平台的xxx地址是一致的，不需要区分端口</p></blockquote></li><li><p>检查客户端访问Server是否能通：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>curl -v http://xxx/server/main/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果不通，则需要检查客户端机器访问Server机器是否有网络限制</p></li><li><p>检查当前在<code>codedog.ini</code>-<code>[config]token</code>与<code>config.ini</code>文件配置的<code>[FILE_SERVER]TOKEN</code>是否一致，如果不一致需要调整为一致</p></li><li><p>检查用户<code>CodeDog</code>的<code>Token</code>是否被刷新了然后没有更新到配置文件中</p></li></ol><h4 id="_3-6-客户端访问文件服务器-提示connection-timed-out" tabindex="-1"><a class="header-anchor" href="#_3-6-客户端访问文件服务器-提示connection-timed-out" aria-hidden="true">#</a> 3.6 客户端访问文件服务器，提示<code>Connection timed out</code></h4><p>本地客户端执行过程提示<code>method (upload file) call fails on error: &lt;urlopen error [Errno 110] Connection timed out&gt;</code> 该如何处理？ 一般情况下，这个问题是客户端与Server之间网络不通导致，可以检查一下是否有防火墙限制或者配置的URL是内部IP或地址，可以通过以下方式检查</p><ol><li><p>检查客户端的<code>config.ini</code>文件配置的URL是否为当前Server部署的地址：（xxx需要调整为实际的路径）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>[SERVER_URL]
URL=http://xxx/server/main/
[FILE_SERVER]
URL=http:/xxx/server/files/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>检查客户端访问Server是否能通：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>curl -v http://xxx/server/main/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果不通，则需要检查客户端机器访问Server机器是否有网络限制</p></li></ol><h4 id="_3-7-任务执行结果异常-提示第三方依赖文件服务器异常" tabindex="-1"><a class="header-anchor" href="#_3-7-任务执行结果异常-提示第三方依赖文件服务器异常" aria-hidden="true">#</a> 3.7 任务执行结果异常，提示<strong>第三方依赖文件服务器异常</strong></h4><p>出现该错误提示，一般是访问文件器出错或文件服务器本身有问题，可以通过以下方式检查： 需要检查<code>analysis-worker</code>的日志（本地部署：<code>server/projects/analysis/log/celery.log</code>，docker-compose部署：<code>docker-compose exec analysis-worker /bin/bash</code>进入容器后访问<code>log/celery.log</code>查看具体错误原因</p><p>如果提示<code>no route to host</code>可能是当前机器/容器无法访问当前宿主机的IP，可以检查一下当前防火墙的设置，是否限制了<code>analysis-worker</code>来源的访问</p><h4 id="_3-8-客户端执行时提示工具-xxx-扫描进程为空-请联系管理员配置工具进程" tabindex="-1"><a class="header-anchor" href="#_3-8-客户端执行时提示工具-xxx-扫描进程为空-请联系管理员配置工具进程" aria-hidden="true">#</a> 3.8 客户端执行时提示<strong>工具(xxx)扫描进程为空，请联系管理员配置工具进程!</strong></h4><p>出现该错误提示，一般是Server未进行初始化，可以通过执行以下命令初始化后再启动测试</p><ul><li>本地部署：<code>cd server &amp;&amp; ./scripts/deploy.sh init</code></li><li>docker-compose部署：<code>./compose_init.sh</code></li></ul><h2 id="codeanalysis仓库文件问题" tabindex="-1"><a class="header-anchor" href="#codeanalysis仓库文件问题" aria-hidden="true">#</a> CodeAnalysis仓库文件问题</h2><h3 id="_1-clone到本地时相关md文件内资源图片无法显示" tabindex="-1"><a class="header-anchor" href="#_1-clone到本地时相关md文件内资源图片无法显示" aria-hidden="true">#</a> 1. clone到本地时相关md文件内资源图片无法显示</h3><p>为防止国内用户访问CodeAnalysis Github首页时图片资源加载失败，目前各个md文件中的图片资源引用地址调整增加了URL前缀<code>https://tencent.github.io/CodeAnalysis/</code>。</p><p>用户下载代码库到本地后，发现无法访问资源文件时，请检查本地网络是否能够连通外网，如果无法连通外网，可以在文档引入资源地址中进行<strong>相对路径</strong>替换，调整各个资源文件的链接。</p><ul><li><p>对于根目录下的md文件，直接删除URL前缀即可：</p><p>例如在<code>https://tencent.github.io/CodeAnalysis/media/homepage.png</code>这个链接可以调整为<code>media/homepage.png</code></p></li><li><p>对于其他目录下的md文件，删除URL前缀后，需调整文件相对路径链接：</p><p>例如对于<code>doc/client.md</code>, 需将<code>https://tencent.github.io/CodeAnalysis/media/clientConfigIni.png</code>这个链接调整为<code>../media/clientConfigIni.png</code></p></li></ul>`,19);function I(F,U){const a=r("RouterLink"),n=r("router-link"),d=r("ExternalLinkIcon");return t(),p("div",null,[h,e("div",m,[v,b,e("p",null,[o("如果您遇到任何未在此处列出的部署或使用问题，请在 GitHub issue 系统中进行搜索。如果仍未找到该错误消息，您可以通过"),i(a,{to:"/en/community/joingroup.html"},{default:l(()=>[o("社区")]),_:1}),o("提出问题，获得帮助。")])]),e("nav",g,[e("ul",null,[e("li",null,[i(n,{to:"#server常见问题与处理方法"},{default:l(()=>[o("Server常见问题与处理方法")]),_:1}),e("ul",null,[e("li",null,[i(n,{to:"#_1-环境部署"},{default:l(()=>[o("1. 环境部署")]),_:1}),e("ul",null,[e("li",null,[i(n,{to:"#_1-1-pypi下载超时或失败"},{default:l(()=>[o("1.1 pypi下载超时或失败")]),_:1})]),e("li",null,[i(n,{to:"#_1-2-docker未安装或版本过低"},{default:l(()=>[o("1.2 Docker未安装或版本过低")]),_:1})]),e("li",null,[i(n,{to:"#_1-3-docker-compose启动失败"},{default:l(()=>[o("1.3 Docker-Compose启动失败")]),_:1})]),e("li",null,[i(n,{to:"#_1-4-docker镜像源下载超时或失败"},{default:l(()=>[o("1.4 Docker镜像源下载超时或失败")]),_:1})]),e("li",null,[i(n,{to:"#_1-5-python安装或执行失败"},{default:l(()=>[o("1.5 Python安装或执行失败")]),_:1})]),e("li",null,[i(n,{to:"#_1-6-执行compose-init-sh脚本的pip-install提示sha256不匹配错误"},{default:l(()=>[o("1.6 执行compose_init.sh脚本的pip install提示sha256不匹配错误")]),_:1})]),e("li",null,[i(n,{to:"#_1-7-macbook-m1-使用-docker-compose报错"},{default:l(()=>[o("1.7 MacBook M1 使用 Docker-Compose报错")]),_:1})]),e("li",null,[i(n,{to:"#_1-8-celery、gunicorn命令找不到"},{default:l(()=>[o("1.8 celery、gunicorn命令找不到")]),_:1})])])]),e("li",null,[i(n,{to:"#_2-服务启动与初始化"},{default:l(()=>[o("2. 服务启动与初始化")]),_:1}),e("ul",null,[e("li",null,[i(n,{to:"#_2-1-服务占用端口异常"},{default:l(()=>[o("2.1 服务占用端口异常")]),_:1})]),e("li",null,[i(n,{to:"#_2-2-服务输出日志找不到"},{default:l(()=>[o("2.2 服务输出日志找不到")]),_:1})])])]),e("li",null,[i(n,{to:"#_3-平台使用"},{default:l(()=>[o("3. 平台使用")]),_:1}),e("ul",null,[e("li",null,[i(n,{to:"#_3-1-平台登录的默认账号密码是什么"},{default:l(()=>[o("3.1 平台登录的默认账号密码是什么？")]),_:1})]),e("li",null,[i(n,{to:"#_3-2-平台默认的api-token是什么"},{default:l(()=>[o("3.2 平台默认的API Token是什么？")]),_:1})]),e("li",null,[i(n,{to:"#_3-3-代码库登记出错-出现代码库及账号不匹配"},{default:l(()=>[o("3.3 代码库登记出错，出现代码库及账号不匹配")]),_:1})]),e("li",null,[i(n,{to:"#_3-4-查看问题文件提示获取代码信息耗时较久-请稍后再试"},{default:l(()=>[o("3.4 查看问题文件提示获取代码信息耗时较久，请稍后再试")]),_:1})]),e("li",null,[i(n,{to:"#_3-5-客户端访问文件服务器-提示method-upload-file-call-fails-on-error-expecting-value-line-1-column-1-char-0"},{default:l(()=>[o("3.5 客户端访问文件服务器，提示method(upload_file) call fails on error: Expecting value: line 1 column 1 (char 0)")]),_:1})]),e("li",null,[i(n,{to:"#_3-6-客户端访问文件服务器-提示connection-timed-out"},{default:l(()=>[o("3.6 客户端访问文件服务器，提示Connection timed out")]),_:1})]),e("li",null,[i(n,{to:"#_3-7-任务执行结果异常-提示第三方依赖文件服务器异常"},{default:l(()=>[o("3.7 任务执行结果异常，提示第三方依赖文件服务器异常")]),_:1})]),e("li",null,[i(n,{to:"#_3-8-客户端执行时提示工具-xxx-扫描进程为空-请联系管理员配置工具进程"},{default:l(()=>[o("3.8 客户端执行时提示工具(xxx)扫描进程为空，请联系管理员配置工具进程!")]),_:1})])])])])]),e("li",null,[i(n,{to:"#codeanalysis仓库文件问题"},{default:l(()=>[o("CodeAnalysis仓库文件问题")]),_:1}),e("ul",null,[e("li",null,[i(n,{to:"#_1-clone到本地时相关md文件内资源图片无法显示"},{default:l(()=>[o("1. clone到本地时相关md文件内资源图片无法显示")]),_:1})])])])])]),_,e("ul",null,[e("li",null,[e("a",f,[o("Compose文件版本与对应的Docker版本说明文档"),i(d)])]),e("li",null,[e("a",x,[o("CentOS安装Docker官方文档"),i(d)])]),e("li",null,[e("a",y,[o("Ubuntu安装Docker文档"),i(d)])])]),k,e("ul",null,[e("li",null,[e("a",E,[o("Docker-Compose官方安装文档"),i(d)])]),e("li",null,[e("a",R,[o("Docker-ComposeV2官方安装文档"),i(d)])])]),C,e("ul",null,[e("li",null,[e("a",T,[o("CentOS安装Python3.7文档"),i(d)])]),e("li",null,[e("a",D,[o("Ubuntu安装Python3.7文档"),i(d)])])]),j,e("ol",null,[S,e("li",null,[o("登记"),N,o("使用的密码需要使用"),e("a",A,[O,i(d)])]),L]),P])}const w=s(u,[["render",I],["__file","FAQ.html.vue"]]);export{w as default};
