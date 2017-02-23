var log = function() {
    console.log.apply(console,arguments)
}

// <span class=" complete glyphicon glyphicon-ok" aria-hidden="true"></span>
// <img class='complete'src='ok.svg'></img>
// <span class=" delete glyphicon glyphicon-remove" aria-hidden="true"></span>
// <img class='delete'src='delete.svg'></img>
// <h4 class='text-center'> 创建时间：</h4>
// <div class='text-center'>${time}</div>
// <h4 class='text-center'>创建内容<h4>
// <h5 class='text-center span-convent ${status}'>${contentValue}</h5>
var save = function(todo) {
    localStorage.todo = JSON.stringify(todo)
}
var showTime = function() {
    var time = new Date()
    var locatime = time.toLocaleString()
    return locatime
}
var load = function(){
    var data = localStorage.todo
    if(data == undefined){
        data = '[]'
    }
    var todo = JSON.parse(data)
    return todo
}
var init = function() {
    var todos = load()
    for (var i = 0; i < todos.length; i++) {
        var todo  = todos[i]
        var content = todo.content
        var status = todo.status
        var time = todo.time
        log('status',status)
        appendLabel(content, status,time)
    }
    showRemind()
}
var template = function (contentValue,status, time) {
    if(status){
        console.log('doneondf')
        var status = 'done'
    }
    var t = `
        <div class="col-sm-3 ">
            <div class="itemLabel" >
                <img class='complete'src='ok.svg'></img>
                <img class='delete'src='delete.svg'></img>
                <h4 class='text-center'> 创建时间：</h4>
                <div class='text-center'>${time}</div>
                <h4 class='text-center'>创建内容<h4>
                <h5 class='text-center span-convent ${status}'>${contentValue}</h5>
                <img class='doneImage hide'src='done.png'></img>
            </div>
        </div>
            `
    return t
}
var appendLabel = function(content,status,time) {
    var t = template(content,status, time)
    $('.addLocation').append(t)
}


var bindAdd = function() {
    var data = load()
    $('.addbutton').click(function(){
        log('点击成功')
        var time  = showTime()
        var value = $("#searchInput > input").val()
        data.push({
            content: value,
            status: false,
            time: time
        })
        appendLabel(value, false,time)
        save(data)
        showRemind()
    }
    )
}
var bindComplete = function() {
    $('.addLocation').click(function(event){
        var todo = load()
        var item  = $(event.target)
        var parent = item.parent('.itemLabel')
        var grandparent = item.parent().parent('.col-sm-3')
        console.log('this',$(event.target))
        var index = grandparent.index()
        log('index', index)
        if(item.hasClass('delete')){
            log('grandparent',grandparent)
            grandparent.remove()
            todo.splice(index,1)
            log('todo', todo)
            showRemind()
        } else if (item.hasClass('complete')) {
            var span1 = parent.find('.doneImage')
            span1.toggleClass('hide')
            todo[index].status = !(todo[index].status)
        }
        save(todo)
    })
}
var showRemind =function() {
    var todos = load()
    if(todos.length == 0) {
        $('.remind').removeClass('hide')
    }else {
        $('.remind').addClass('hide')
    }
}
var bindDeletAll = function() {
    $('.deleteAll').click(function(){
        console.log('点击清除')
        $('.addLocation').empty()
        localStorage.removeItem("todo")
        showRemind()
    })
}

var _main = function() {
    init()
    bindAdd()
    bindComplete()
    bindDeletAll()
}

_main()
