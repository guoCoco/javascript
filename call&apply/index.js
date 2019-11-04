/**
 * 实现 call  apply 原理
 * 
 * 分析： 
 * 1. Function.prototype 上的方法，修改函数执行的上下文
 * 2. apply 有两个参数， 一个 修改 后的上下文一个 函数参数数组
 * 3. call 参数多个， 第一个为 上下文 后面的都是函数参数
 * */ 


Function.prototype.call = function () {
    const [context, ...args] = [...arguments]

    if (!context) {
        context = typeof window !== 'object' ? global : window
    }

    context.func = this

    const res = context.func(...args)

    delete context.func

    return res
}

const obj = { 
    a: 1
}
const a = 10
function say() {
    console.log(this.a)
}

say.call(obj)


Function.prototype.apply = function(context, args) {
    
    if (!context) {
        context = typeof window !== 'object' ? global : window
    }

    context.func = this
    let res;
    if (args) {
        res = context.func(...args)
    } else {
        res = context.func()
    }

    delete context.func

    return res

}
