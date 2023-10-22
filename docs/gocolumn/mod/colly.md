---
title: 强大的爬虫库 - Colly
date: 2023-10-22 21:40
description: colly是用 Go 语言编写的功能强大的爬虫框架。它提供简洁的 API，拥有强劲的性能，可以自动处理 cookie&session，还有提供灵活的扩展机制。
tag: 
 - 酷的库
hidden: true
---
# 强大的爬虫库 - Colly
## 简介
**colly**是用 Go 语言编写的功能强大的爬虫框架。它提供简洁的 API，拥有强劲的性能，可以自动处理 cookie&session，还有提供灵活的扩展机制。

首先，我们介绍**colly**的基本概念。然后通过几个案例来介绍**colly**的用法和特性：**拉取 GitHub Treading，拉取百度小说热榜，下载 Unsplash 网站上的图片。**

## 快速使用
本文代码使用 Go Modules。

创建目录并初始化：
```go
$ mkdir colly && cd colly
$ go mod init github.com/darjun/go-daily-lib/colly
```

安装**colly**库：
```go
$ go get -u github.com/gocolly/colly/v2
```

使用：
```go
package main

import (
  "fmt"

  "github.com/gocolly/colly/v2"
)

func main() {
  c := colly.NewCollector(
    colly.AllowedDomains("www.baidu.com" ),
  )

  c.OnHTML("a[href]", func(e *colly.HTMLElement) {
    link := e.Attr("href")
    fmt.Printf("Link found: %q -> %s\n", e.Text, link)
    c.Visit(e.Request.AbsoluteURL(link))
  })

  c.OnRequest(func(r *colly.Request) {
    fmt.Println("Visiting", r.URL.String())
  })

  c.OnResponse(func(r *colly.Response) {
    fmt.Printf("Response %s: %d bytes\n", r.Request.URL, len(r.Body))
  })

  c.OnError(func(r *colly.Response, err error) {
    fmt.Printf("Error %s: %v\n", r.Request.URL, err)
  })

  c.Visit("http://www.baidu.com/")
}
```

**colly**的使用比较简单：

首先，调用 **colly.NewCollector()** 创建一个类型为 **colly.Collector**的爬虫对象。由于每个网页都有很多指向其他网页的链接。如果不加限制的话，运行可能永远不会停止。所以上面通过传入一个选项 **colly.AllowedDomains("www.baidu.com")** 限制只爬取域名为www.baidu.com的网页。

然后我们调用c.OnHTML方法注册HTML回调，对每个有href属性的a元素执行回调函数。这里继续访问href指向的 URL。也就是说解析爬取到的网页，然后继续访问网页中指向其他页面的链接。

调用 **c.OnRequest()** 方法注册请求回调，每次发送请求时执行该回调，这里只是简单打印请求的 URL。

调用 **c.OnResponse()** 方法注册响应回调，每次收到响应时执行该回调，这里也只是简单的打印 URL 和响应大小。

调用 **c.OnError()** 方法注册错误回调，执行请求发生错误时执行该回调，这里简单打印 URL 和错误信息。

最后我们调用**c.Visit()**开始访问第一个页面。

运行：
```go
$ go run main.go
Visiting http://www.baidu.com/
Response http://www.baidu.com/: 303317 bytes
Link found: "百度首页" -> /
Link found: "设置" -> javascript:;
Link found: "登录" -> https://passport.baidu.com/v2/?login&tpl=mn&u=http%3A%2F%2Fwww.baidu.com%2F&sms=5
Link found: "新闻" -> http://news.baidu.com
Link found: "hao123" -> https://www.hao123.com
Link found: "地图" -> http://map.baidu.com
Link found: "直播" -> https://live.baidu.com/
Link found: "视频" -> https://haokan.baidu.com/?sfrom=baidu-top
Link found: "贴吧" -> http://tieba.baidu.com
...
```

**colly** 爬取到页面之后，会使用goquery解析这个页面。然后查找注册的 HTML 回调对应元素选择器（element-selector），将goquery.Selection封装成一个colly.HTMLElement执行回调。

**colly.HTMLElement** 其实就是对 **goquery.Selection** 的简单封装：
```go
type HTMLElement struct {
  Name string
  Text string
  Request *Request
  Response *Response
  DOM *goquery.Selection
  Index int
}
```

并提供了简单易用的方法：
:::info
- **Attr(k string)**：返回当前元素的属性，上面示例中我们使用e.Attr("href")获取了href属性；
- **ChildAttr(goquerySelector, attrName string)**：返回goquerySelector选择的第一个子元素的attrName属性；
- **ChildAttrs(goquerySelector, attrName string)**：返回goquerySelector选择的所有子元素的attrName属性，以[]string返回；
- **ChildText(goquerySelector string)**：拼接goquerySelector选择的子元素的文本内容并返回；
- **ChildTexts(goquerySelector string)**：返回goquerySelector选择的子元素的文本内容组成的切片，以[]string返回。
- **ForEach(goquerySelector string, callback func(int, *HTMLElement))**：对每个goquerySelector选择的子元素执行回调callback；
- **Unmarshal(v interface{})**：通过给结构体字段指定 goquerySelector 格式的 tag，可以将一个 HTMLElement 对象 - Unmarshal 到一个结构体实例中。
这些方法会被频繁地用到。下面我们就通过一些示例来介绍colly的特性和用法。
:::