# 使用 k6 对 .NET 进行性能测试

## 什么是性能测试

在软件开发中，性能测试是一种常见的测试实践，用于确定系统在特定工作负载下的响应能力和稳定性表现。它还用于排查，观察，验证系统在其他方面的质量。例如可扩展性，可靠性和资源使用情况。
性能测试是测试工程的一个子集，是一种计算机科学实践，致力于将性能指标构建在系统的设计,实现和架构中。

### 相关概念解释

#### QPS

> 每秒查询率 Queries Per Second。每秒的响应请求数，也即是最大吞吐能力，是衡量服务器性能端一个重要指标。

#### TPS

> 每秒处理的事务数目 Transactions Per Second。每个 TPS 包含一个完整的请求流程（客户端请求服务端-> 服务端响应并处理【包含数据库访问】 -> 服务端返回给客户端）

#### RPS

> 每秒吞吐率 Requests Per Second。指的是某个并发用户数下单位时间内处理的请求数。在不考虑事务的情况下可以近似与 TPS。

### 常见性能测试工具

> 由于我对其他测试框架不是很了解，这里只是简单的罗列，感兴趣的同学可以帮忙补充。关于这几种测试框架的对比，可以参考 Thoughtworks 的一篇洞见（文末有连接）：

- [JMitter](https://jmeter.apache.org/)
- [wrk](https://github.com/wg/wrk)
- [k6](https://github.com/grafana/k6)
- ...

## K6 介绍

**K6** 是一个基于 `Go` 语言实现的一个负载测试工具，其官网描述为: `The best developer experience for load testing`。具有如下关键特点：

- 提供对开发者友好的 CLI 工具
- 使用 JS/TS 进行脚本编写，支持本地和远程模块
- 提供 `Check` 和 `Thresholds` 功能，以目标为导向，友好的自动化测试
- 支持多种 DevOps 平台和可视化平台

### 常见性能测试类型

维基百科罗列了多达 **8种** 性能测试类型，感兴趣的小伙伴可以查看文末连接查看更多详细内容。这里结合 K6 主要介绍如下几种测试类型如下几种常见的测试类型：

#### Smoke testing

> 中文释意为 **冒烟测试**。是一种常规测试，通过配置最小负载来验证系统的完整性。其主要目的是：验证测试脚本是否有问题；验证系统在最小负载情况下是否出现异常。

#### Load testing

> 中文释意为 **负载测试**。是一种重要的性能测试。主要关注根据并发用户数或每秒请求数评估系统的当前性能。其主要目的是：用于确定系统在正常和峰值条件下的行为，确保当许多用户同时访问应用程序时，应用程序的性能能达到令人满意的程度。

#### Stress testing

> 中文释意为 **压力测试**。用于确定系统的性能瓶颈。其主要目的是：验证系统在极端条件下的稳定性和可靠性。

#### Soak testing

> 中文释意为 **浸泡测试**。其主要目的是：通过较长时间的性能测试来发现系统长时间处于压力之下而导致的性能和可靠性问题。

### 关键词解释

- vus:当前并发数(虚拟用户数)
- vus_max:最大并发数(虚拟用户的最大数量)
- rps:每秒并发请求数
- duration:持续运行时间
- checks:断言成功率
- data_sent:发送的数据量
- data_received:接收到的数据量
- iterations:测试中的vu执行js脚本（default函数）的总次数
- iteration_duration:完成默认/主函数的完整迭代所花费的时间
- dropped_iterations:由于缺少vu（对于达到率执行程序）或缺少时间（由于基于迭代的执行程序中maxDuration过期）而无法启动的迭代次数

### 环境搭建

k6 支持 `Linux`,`Mac`,`Windows`,`Docker`方式来安装，本文以 Mac 系统为例：

```bash
brew install k6
```

### 常用命令

## 实战展示

### Smoke testing

本文采用 .NET 6 中的 MinimalAPI 的方式构建了 2 个测试路由，用于后面的结果对比。示例代码如下所示：

```csharp
const int maxLength = 1_000_000;

app.MapGet("/GetWeatherForecastV1", () =>
{
    var forecast = new object[maxLength];
    for (var i = 0; i < forecast.Length; i++)
    {
        forecast[i] = new
        {
            Date = DateTime.Now.AddDays(i),
            temperatureC = Random.Shared.Next(-20, 55),
        };
    }

    return forecast.Length;
}).WithName("GetWeatherForecastV1");

app.MapGet("/GetWeatherForecastV2", () =>
{
    var forecast = new object[maxLength];
    Parallel.For(0, maxLength, i =>
    {
        forecast[i] = new
        {
            Date = DateTime.Now.AddDays(i),
            temperatureC = Random.Shared.Next(-20, 55),
        };
    });

    return forecast.Length;
}).WithName("GetWeatherForecastV2");
```

### 集成 K6 Cloud

### 集成 Azure Pipelines

### 集成第三方 Dashboard

## 相关参考

- [如何使用k6做性能测试](https://insights.thoughtworks.cn/performance-testing-k6/)
- [k6负载测试学习知识](https://www.cnblogs.com/kerwincui/p/15553623.html)
- [Software performance testing](https://en.wikipedia.org/wiki/Software_performance_testing)
- [K6](https://github.com/grafana/k6)
- [Load testing with Azure Pipelines](https://k6.io/blog/integrating-load-testing-with-azure-pipelines/)
- [Load Testing With Azure DevOps And K6](https://medium.com/microsoftazure/load-testing-with-azure-devops-and-k6-839be039b68a)
- [On .NET Live - Performance and Load testing with k6](https://www.youtube.com/watch?v=PYHZLCTC7i0)
- [Getting started with API Load Testing (Stress, Spike, Load, Soak)](https://www.youtube.com/watch?v=r-Jte8Y8zag)

