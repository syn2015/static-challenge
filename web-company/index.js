// glide初始化轮播
const glide=new Glide('.glide')
// 获取所有页面的所有标题
const captionsEl=document.querySelectorAll('.slide-caption');


// 文字出现效果,监听mount.after,run.after,加载后和轮播后
glide.on(['mount.after','run.after'],()=>{
    // 根据轮播的index确定页面的标题
    const caption=captionsEl[glide.index];
    //设置动画
    anime({
        targets:caption.children,  //caption下的每个元素
        opacity:[0,1],              // 从0到1，渐渐显
        duration:400,               // 动画时间
        easing:'linear',            // 动画函数
        delay:anime.stagger(400,{start:300}), // 轮流对标题元素执行动画，等待300ms
        translateY:[anime.stagger([40,10]),0] // 从下方到上方，最后到到目标位置
    })
})
// 轮播的同时也有动画，轮播前opacity为0
glide.on('run.before',()=>{
    document.querySelectorAll('.slide-caption > *').forEach(el=>{
        el.style.opacity=0;
    })
})

glide.mount();
// 图片删选isotope
const isotope=new Isotope('.cases',{
    // 每行占满换行
    layoutMode:'fitRows',
    // 指定layoutMode的目标元素
    itemSelector:'.case-item'
});
//为父元素监听事件，利用冒泡分配到子元素上
const filterBtns=document.querySelector('.filter-btns');
filterBtns.addEventListener('click',e=>{
    let {target}=e;
    const filterOption=target.getAttribute('data-filter');
    if(filterOption){
       document.querySelectorAll('.filter-btn.active').forEach(btn=>{
           btn.classList.remove('active');
           target.classList.add('active');
        //    筛选
        isotope.arrange({filter:filterOption});
       })
    }
})
