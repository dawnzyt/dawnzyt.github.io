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

// 2. 同步切换图片
// loadImg 函数接受一个图像 URL，并返回一个 Promise，这个 Promise 会在图像加载完成时解析。
// 使用 Promise.all 来等待两个图像都加载完成。
// 当两个图像都成功加载后，才将它们的 src 属性设置为加载成功的图像 URL，从而确保两个图像同步显示。
function changeImages(event, cmpId, imgTopSrc, imgBottomSrc) {
    const cmpContainer = document.getElementById(cmpId);
    if (!cmpContainer) return;
    
    const topImg = cmpContainer.querySelector('.top img');
    const bottomImg = cmpContainer.querySelector('.bottom img');
    if (!topImg || !bottomImg) return;

    const loadImg = (src) => {
        // Promise 构造函数实现图像的异步读取，成功调用resolve(src)传递图像 URL，失败调用reject(error)传递错误信息。
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(src);
            img.onerror = reject;
            img.src = src; // 设置图像 URL，开始加载图像
        });
    };
    // Promise.all 接受一个 Promise 数组，等待所有 Promise 解析 then得到解析结果，成功各自得到对应resolve中的src，任何一个失败将捕获error信息。
    Promise.all([loadImg(imgTopSrc), loadImg(imgBottomSrc)])
        .then(([loadedTopSrc, loadedBottomSrc]) => {
            topImg.src = loadedTopSrc;
            bottomImg.src = loadedBottomSrc;
            // 获取当前按钮的父元素容器
            const buttonContainer = event.target.parentElement;
            
            // 移除该容器内所有按钮的 .cmp-btn-checked 类
            const buttons = buttonContainer.querySelectorAll('.cmp-button');
            buttons.forEach(button => {
                button.classList.remove('cmp-btn-checked');
            });

            // 为当前点击的按钮添加 .cmp-btn-checked 类
            event.target.classList.add('cmp-btn-checked');
        })
        .catch(error => {
            console.error('Image loading error:', error);
        });
}

