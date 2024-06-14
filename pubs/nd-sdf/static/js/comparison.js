// 为所有cmp-container绑定鼠标进入、离开、移动事件以实现滑动对比效果
const cmpContainers = document.querySelectorAll('.cmp-container');
cmpContainers.forEach(container => {
    const slider = container.querySelector('.cmp-slider');
    let active = false // 当mouse移动到container上时，active为true此时move slider
    container.addEventListener('mouseenter', function(){
        active = true;
        slider.classList.add('sliding');

    });
    container.addEventListener('mouseleave', function(){
        active = false;
        slider.classList.remove('sliding');

    });
    container.addEventListener('mousemove', function(e){
        if(active){
            // 计算相对container的x坐标
            x = e.clientX - container.getBoundingClientRect().left;
            move(x);
        }
    });
    
    function move(x){
        x = Math.max(0, Math.min(x, container.offsetWidth)); // 限制x在container范围内,offsetWidth是元素的宽度不包括margin。
        container.querySelector('.top').style.width = x + 'px'; // slider图像
        slider.style.left = x - 15 + 'px'; // slider位置
    }
});
// let slider = document.querySelector('.cmp-slider');
// let container = document.querySelector('.cmp-container');

// 绑定按钮点击事件以切换图片
// function changeImages(cmpId, imgTopSrc, imgBottomSrc) {
//     const cmpContainer = document.getElementById(cmpId);
//     if (cmpContainer) {
//         const topImg = cmpContainer.querySelector('.top img');
//         const bottomImg = cmpContainer.querySelector('.bottom img');
        
//         if (topImg) {
//             topImg.src = imgTopSrc;
//         }
        
//         if (bottomImg) {
//             bottomImg.src = imgBottomSrc;
//         }
//     }
// }


// 预加载所有图片
document.addEventListener("DOMContentLoaded", function() {
    const images = [
        './static/images/cmp/monosdf/scannetpp_1.png', './static/images/cmp/ours/scannetpp_1.png',
        './static/images/cmp/monosdf/scannetpp_2.png', './static/images/cmp/ours/scannetpp_2.png',
        './static/images/cmp/monosdf/scannetpp_3.png', './static/images/cmp/ours/scannetpp_3.png',
        './static/images/cmp/monosdf/scannetpp_4.png', './static/images/cmp/ours/scannetpp_4.png',
        './static/images/cmp/monosdf/scannetpp_5.png', './static/images/cmp/ours/scannetpp_5.png',
        './static/images/cmp/monosdf/scannetpp_6.png', './static/images/cmp/ours/scannetpp_6.png',
        './static/images/cmp/monosdf/scannet_1.png', './static/images/cmp/ours/scannet_1.png',
        './static/images/cmp/monosdf/scannet_2.png', './static/images/cmp/ours/scannet_2.png',
        './static/images/cmp/monosdf/scannet_3.png', './static/images/cmp/ours/scannet_3.png',
        './static/images/cmp/monosdf/scannet_4.png', './static/images/cmp/ours/scannet_4.png',
        './static/images/cmp/monosdf/tnt_1.png', './static/images/cmp/ours/tnt_1.png',
        './static/images/cmp/monosdf/tnt_2.png', './static/images/cmp/ours/tnt_2.png',
        './static/images/cmp/monosdf/tnt_3.png', './static/images/cmp/ours/tnt_3.png',
        './static/images/cmp/monosdf/tnt_4.png', './static/images/cmp/ours/tnt_4.png',
        './static/images/cmp/tnt_normal/tnt2048_normal_1.png', './static/images/cmp/tnt_2048/tnt2048_1.png',
        './static/images/cmp/tnt_normal/tnt2048_normal_2.png', './static/images/cmp/tnt_2048/tnt2048_2.png',
        './static/images/cmp/tnt_normal/tnt2048_normal_3.png', './static/images/cmp/tnt_2048/tnt2048_3.png',
        './static/images/cmp/tnt_normal/tnt2048_normal_4.png', './static/images/cmp/tnt_2048/tnt2048_4.png'
    ];
    

    images.forEach(src => preloadImage(src));
});

function preloadImage(src) {
    const img = new Image();
    img.src = src;
    img.onload = () => console.log(`${src} loaded successfully`);
    img.onerror = () => {
        console.error(`Failed to load ${src}, retrying...`);
        setTimeout(() => preloadImage(src), 1000); // Retry after 1 second
    };
}

function changeImages(event, cmpId, imgSrc1, imgSrc2) {
    const cmpContainer = document.getElementById(cmpId);
    if (!cmpContainer) return;
    
    const topImg = cmpContainer.querySelector('.top img');
    const bottomImg = cmpContainer.querySelector('.bottom img');
    if (!topImg || !bottomImg) return;
    topImg.src = imgSrc1;
    bottomImg.src = imgSrc2;
    // 获取当前按钮的父元素容器
    const buttonContainer = event.target.parentElement;
    
    // 移除该容器内所有按钮的 .cmp-btn-checked 类
    const buttons = buttonContainer.querySelectorAll('.cmp-button');
    buttons.forEach(button => {
        button.classList.remove('cmp-btn-checked');
    });

    // 为当前点击的按钮添加 .cmp-btn-checked 类
    event.target.classList.add('cmp-btn-checked');

}

