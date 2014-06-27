var rememberTop = 0;

window.onscroll = (function(e) {
    parallaxScroll();
});

function parallaxScroll() {
    var scrollTop = (window.pageYOffset !== undefined) ?
        window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var el = document.querySelector(".navigationMenu");
    var top = el.offsetTop;
    if(top && top < scrollTop ){
        rememberTop = top;
        el.classList.add('fixedMenu');
    }
    if(rememberTop && scrollTop < rememberTop){
        el.classList.remove('fixedMenu');
    }
}



var xhr = new XMLHttpRequest();
xhr.onload = function(){
    //var compiled = _.template(this.response);
    var data = JSON.parse(this.response);
    var tpl = document.getElementById('articleTmp').innerText;
    var compiled = _.template(tpl);
    var toAppendString = "";
    for (var i = 0; i < data.length; i++) {
        toAppendString += compiled(data[i]);
    }
    var div = document.querySelector(".articles");
    div.innerHTML = toAppendString;
    //document.getElementsByTagName('body')[0].appendChild(div);

};
xhr.open('GET', 'posts.json');
xhr.send();




/*
<!--article>
    <div>
        <img src="images/img1.jpg">
        </div>
        <h3>
            <a href="#">Blogotitle of blogopost about blogoflowers</a>
        </h3>
        <div class="articleInfo">
            <time>22:58 Jan 01, 2014</time>
            <div class="author">by E. Hyperraccoon</div>
            <div class="social">
                <a href="#" class="fb">16</a>
                <a href="#" class="goo">7</a>
                <a href="#" class="twi">15</a>
                <a href="#" class="vk">16</a>
                <a href="#" class="ya">1</a>
            </div>
        </div>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur dolore dolores dolorum
        expedita facere ipsa iure laborum minima mollitia nobis, officiis, quas qui quis quos tempora,
        veritatis voluptate voluptatibus? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque deleniti
        dolores iusto maxime porro quisquam quos voluptates! A ab ad architecto atque deleniti, ea eligendi eum facilis
        illo incidunt inventore iste iusto labore laudantium libero mollitia nisi omnis quibusdam quidem quos reiciendis
        rem repellat repudiandae rerum, sit suscipit tenetur voluptate.
        </p>
    </article-->*/