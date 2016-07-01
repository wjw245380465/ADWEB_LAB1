# ADWEB_LAB1
关于AngularJS 动画效果的学习



在Angular当中，CSS和JavaScript之间唯一的区别就是它们的定义。没有什么区别妨碍到被定义的动画被使用。首先，我们需要加载ngAnimate模块到我们应用的root模块当中。

angular.module('coursesApp', ['ngAnimate']);
而所有将被处理的JavaScript动画事件依然保持不变。以下是一个直接支持的动画列表和它们对应的不同行为：
指令事件集
ng-view
ng-include
ng-switch
ng-if  enter
leave
ng-repeat  enter
leave
move
ng-show
ng-hide
ng-class  add
remove
以上列表和上一篇文章一样，但没有提到相应的CSS类，因为我们不需要用到它们来定义JavaScript动画。所有这些事件只有在应用模块加载了ngAnimate模块后才会产生。现在让我们看一看如何让这些指令动起来。

自定义Angular动画的语法
以下是一个自定义JavaScript动画基本的框架：

angular.module('coursesApp').animation('.name-of-animation', function(<injectables>) {
 return {
 event: function(elem, done){
  //logic of animation
  done();
 }
 };
});
这是有一些在AngularJS中写JavaScript动画时需要记住的要点：
    动画的名字以点（.）开头
    所有动画行为接受两个参数：
        在当前即将运行动画的DOM元素中的一个对象，要么是在jQuery没有赶在AngularJS加载之前进行加载的一个jQlite对象，要么是一个jQuery对象。
        一个动画结束时的回调函数。指令对应的行为动作被暂停，直到回调函数被调用。
我们有若干的JavaScript库，像jQuery、Greensock、Anima和其它几个让编写动画变得容易的库。为了保持简洁，我正在这篇文章中使用jQuery来创建动画。为了学习其它几个库，你可以访问它们对应的网站。
 
让ng-view动起来
在一个ng-view指令上使用的动画在切换AngularJS应用的视图时运行。
以下是一块视图正在出现时，动画所引起的视觉效果：

courseAppAnimations.animation('.view-slide-in', function () {
 return {
 enter: function(element, done) {
  element.css({
  opacity: 0.5,
  position: "relative",
  top: "10px",
  left: "20px"
  })
  .animate({
  top: 0,
  left: 0,
  opacity: 1
  }, 1000, done);
 }
 };
});
以上创建了一个视图进入画面时的滑入效果。其中done方法被做为回调函数传入。这是为了表明动画已经结束，并且现在AngularJS框架可以继续下一个动作。
注意animate()方法被调用的方法。我们不必将这个元素转换成一个jQuery对象，因为jQuery在加载AngularJS前已经加载。
现在我们需要应用这个动画效果到ng-view指令上。尽管这个动画是在JavaScript里定义的，按照约定我们使用一个class标记来将它应用到目标指令上。
 
?
1
<div ng-view class="view-slide-in"></div>
ng-repeat 动画
在你可以选择使用的指令里面，ng-repeat是一个非常重要的指令。还有两个基本的操作指令是过滤和排序。根据执行的操作添加，移动，或者移除相应的指令。
下面演示使用一些基本的动画，当发生变化的时候你就可以看到相应的动画效果。

courseAppAnimations.animation('.repeat-animation', function () {
 return {
 enter : function(element, done) {
  console.log("entering...");
  var width = element.width();
  element.css({
  position: 'relative',
  left: -10,
  opacity: 0
  });
  element.animate({
  left: 0,
  opacity: 1
  }, done);
 },
 leave : function(element, done) {
  element.css({
  position: 'relative',
  left: 0,
  opacity: 1
  });
  element.animate({
  left: -10,
  opacity: 0
  }, done);
 },
 move : function(element, done) {
  element.css({
  left: "2px",
  opacity: 0.5
  });
  element.animate({
  left: "0px",
  opacity: 1
  }, done);
 }
 };
});
 
Ng-hide动画
ng-hide指令用于添加或移除目标元素的ng-hide样式类。 为了使用某个动画，我们经常需要添加或移除css样式。 将类名传递给动画处理类来实现这个效果。 这可以让我们检查这个类，对代码进行适当的修改。
下面是一个动画的示例代码，用ng-hide指令实现元素的渐隐渐显效果：

courseAppAnimations.animation('.hide-animation', function () {
 return {
 beforeAddClass : function(element, className, done) {
  if (className === 'ng-hide') {
  element.animate({
   opacity: 0
  },500, done);
  } else {
  done();
  }
 },
 removeClass : function(element, className, done) {
  if (className === 'ng-hide') {
  element.css('opacity',0);
  element.animate({
   opacity: 1
  }, 500, done);
  } else {
  done();
  }
 }
 };
});

让自定义指令动起来
为了让自定义指令产生动画效果，我们需要用到$animate 这个服务。尽管$animate服务 是AngularJS核心框架的一部分，也需要加载ngAnimate后才能让这个服务发挥最大的作用。
使用上一篇文章中同样的例子，我们将展现一页课程列表。我们创建一条指令来显示格子中课程的细节内容，并且格子中的内容会在点击"View Statistics"这个链接时改变。让我们添加一种动画来把这个转换效果呈现给用户。
当转换动画开始的时候，我们将添加一个CSS类标记，结束时，移去这个类标记。以下是针对这个指令的示例代码：

app.directive('courseDetails', function ($animate) {
  return {
  scope: true,
  templateUrl: 'courseDetails.html',
  link: function (scope, elem, attrs) {
   scope.viewDetails = true;
   elem.find('button').bind('click', function () {
   $animate.addClass(elem, "switching", function () {
    elem.removeClass("switching");
    scope.viewDetails =! scope.viewDetails;
    scope.$apply();
  });
  });
 }
 };
});

正如你所看到的，我们在动画结束时执行这个动作。在浏览器的开发者工具中，我们会在查看指令元素时发现switching-active和switching-add这两个类标记正被很快的添加随后被移除。我们可以通过定义一个CSS转换样式或者一个自定义的JavaScript动画来查看动画的效果。以下就是一个简单地CSS转换样式，可以被用于上面提到的指令，为了简洁性我们移去了特定的前缀：

.det-anim.switching {
 transition: all 1s linear;
 position: relative;
 opacity: 0.5;
 left: -20px;
}
又或者，这里有一个jQuery写的动画，可以用于同样的指令：

courseAppAnimations.animation('.js-anim', function () {
 return {
 beforeAddClass: function(element, className, done) {
  if (className === 'switching') {
  element.animate({
   opacity: 0
  },1000, function (){
   element.css({
   opacity: 1
   });
   done();
  });
  }
  else {
  done();
  }
 }
 }
});
这些动画当中，如果它可以应用于内建的指令上，它同样也可以被应用到自定义的指令上：
<div course-details 
  class="det-anim"
  title="{{course.title}}">
</div>
你可以在示例页面看到以上所有的动画运行时的效果。
 
结论
动画，当被适合并正常的运用时，将给应用程序带来生气。正如我们所看到的，AngularJS对CSS和JavaScript动画都提供各种支持。你可以根据团队的情况来挑选其中一种。
但是，使用太多的动画将会使得应用程序变得缓慢，而对于用户来，这将使应用程序看起来i不够人性化。所以，必须小心并最优化的使用这件利器。
