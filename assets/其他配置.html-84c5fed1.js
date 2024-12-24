import{_ as o,o as e,c as i,e as c}from"./app-697cd87e.js";const d={},t=c(`<h1 id="其他配置与用法" tabindex="-1"><a class="header-anchor" href="#其他配置与用法" aria-hidden="true">#</a> 其他配置与用法</h1><h3 id="_1-配置使用本地工具" tabindex="-1"><a class="header-anchor" href="#_1-配置使用本地工具" aria-hidden="true">#</a> 1. 配置使用本地工具</h3><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>如果由于网络原因，执行时无法从github自动拉取工具，或拉取比较慢，可以参考基础配置腾讯工蜂工具地址，或使用以下方式预先下载好工具，配置使用本地工具目录。</p></div><ul><li>（1）如果使用的是开源版Client源码，需要在命令行(windows环境下可以启动<code>git bash</code>)中执行以下命令：</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>bash ./scripts/base/install_bin.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>（2）下载工具配置库 <code>https://github.com/TCATools/puppy-tools-config.git</code> ，存放到 <code>tools</code>目录下（如果未生成，可先创建该目录）。</li><li>（3）根据当前机器操作系统，查看<code>puppy-tools-config</code>目录下的<code>linux_tools.ini</code>或<code>mac_tools.ini</code>或<code>windows_tools.ini</code>文件，将<code>[tool_url]</code>中声明的所有工具下载到 <code>tools</code>目录下。</li><li>（4）填写<code>client/config.ini</code>中的配置：<code>USE_LOCAL_TOOL</code>=<code>True</code>，即可使用下载好的本地工具，不自动拉取和更新工具。</li></ul><h3 id="_2-使用自建git-server存放工具" tabindex="-1"><a class="header-anchor" href="#_2-使用自建git-server存放工具" aria-hidden="true">#</a> 2. 使用自建git server存放工具</h3><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>如果自己搭建了一套git server，可以将工具配置库 <code>https://github.com/TCATools/puppy-tools-config.git</code> 以及里面声明的工具仓库，存放到自建git serevr上。</p></div><ul><li>（1）将工具配置库 <code>https://github.com/TCATools/puppy-tools-config.git</code> 上传到自建git仓库。</li><li>（2）按所需的操作系统，将<code>puppy-tools-config</code>仓库下的<code>linux_tools.ini</code>或<code>mac_tools.ini</code>或<code>windows_tools.ini</code>文件中<code>[tool_url]</code>声明的所有工具库，上传到自建git仓库。</li><li>（3）修改<code>linux_tools.ini</code>或<code>mac_tools.ini</code>或<code>windows_tools.ini</code>文件中<code>[base_value]</code>中的<code>git_url</code>为自建git server地址。</li><li>（4）修改<code>client/config.ini</code>中的<code>TOOL_CONFIG_URL</code>为自建git server的<code>puppy-tools-config</code>仓库地址。</li><li>（5）填写<code>client/config.ini</code>中的<code>[TOOL_LOAD_ACCOUNT]</code>配置，输入有拉取权限的用户名密码，即可使用自建git server拉取工具。</li></ul><h3 id="_3-git-lfs带宽和存储配额不够问题" tabindex="-1"><a class="header-anchor" href="#_3-git-lfs带宽和存储配额不够问题" aria-hidden="true">#</a> 3. git lfs带宽和存储配额不够问题</h3><ul><li>如果git拉取工具时，出现git lfs拉取失败，可能是lfs带宽和存储配额不够，可以打开对应的工具github页面，通过<code>Download ZIP</code>的方式下载工具压缩包，再解压到<code>tools</code>目录下。</li></ul>`,11),l=[t];function s(n,a){return e(),i("div",null,l)}const u=o(d,[["render",s],["__file","其他配置.html.vue"]]);export{u as default};
