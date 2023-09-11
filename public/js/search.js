async function searchByAjax() {
  const searchTerm = document.getElementById("nav-main-searchbar");
  const searchTermValue = searchTerm.value;
  const response = await fetch(`/search_by_ajax?q=${searchTermValue}`, {
    method: "GET",
  });
  const resp = await response.json();
  console.log(resp);

  let str=``;
  for(let index=0;index<resp.productsData.length;index++){
    const productData = resp.productsData[index];
    const productRating = resp.productsRatingArray[index];
    const isLogin=resp.isLoggedin;
    
    let t2=``;
    for(let index=1;index<productData.imagesURL.length;index++){
      t2 = t2 + `
      <div class="carousel-item">
        <img src=${productData.imagesURL[index]} width="100%" height="250px" class="d-block w-100" alt="image${index}">
      </div>
      `;
    }
    let endstr = productData.name.length>20 ? '...':'';
    let totalNumberofPeople = productRating.ratingArray[5]+productRating.ratingArray[4]+productRating.ratingArray[3]+productRating.ratingArray[2]+productRating.ratingArray[1] ;
    let sum = productRating.ratingArray[5]*5 +productRating.ratingArray[4]*4 +productRating.ratingArray[3]*3 + productRating.ratingArray[2]*2 + productRating.ratingArray[1]*1;
    if(totalNumberofPeople===0){
      totalNumberofPeople=1;
    }
    let t3=``;
    if (isLogin) {
      t3=`
      <button type="submit" style="border:0px">
      <i class="fa-regular fa-heart wishlistInner" id="heartWishlist" onclick="wishlistHeartToggleFunction(this)"></i>
    </button>`;
    }
    let t4=``;
    if (productData.ruggedVerrified==="true") {
      t4=`<img src="/Images/Verrification/rugged-verified-high-resolution-color-logo-slim.png" alt="Rugged Verrified" class="RuggedVerified">`
    }
    let t1 = `
  <a href="/product?id=${productData._id}" class="cardTitleInner">
    <div class="card totalCard" style="width: 16rem; height:30rem">
      <div data-bs-theme="dark">
        <div id="carousel${productData._id}" class="carousel slide" data-bs-ride="false">
          <div class="carousel-inner myCarousel">
            <div class="carousel-item active">
              <img src=${productData.imagesURL[0]} width="100%" height="250px" class="d-block w-100" alt="image0">
            </div>
            ${t2}
          </div>
          <button class="carousel-control-prev carouselButton" type="button" data-bs-target="#carousel${productData._id}" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="false"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next carouselButton" type="button" data-bs-target="#carousel${productData._id}" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="false"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="cardBodyHead">
        <h6 class="card-title myCardTitle" style="font-size: large; font-weight: bold;">${productData.name.substring(0,20)+endstr}</h6>
          <div class="rightCompartment ">
          <span class="starsRatingGreen rightCompartmentInner popupRating" onclick="popupRatingFunction('${productData._id}')">${(sum/(totalNumberofPeople)).toFixed(2)}
              <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" class="innerStars">
              <div class="popupContent" id=${productData._id}>
                <span class="heading">User Rating</span>
                <div class="row UserRatingGrid">
                  <div class="EdgeColumn">
                    <div>5 star</div>
                  </div>
                  <div class="CentreColumn">
                    ★★★★★
                    <!-- <div class="barContainer">
                      <div class="bar5"></div>
                    </div> -->
                  </div>
                  <div class="EdgeColumn rightText">
                    <div>${productRating.ratingArray[5]}</div>
                  </div>
                  <div class="EdgeColumn">
                    <div>4 star</div>
                  </div>
                  <div class="CentreColumn">
                    ★★★★☆
                    <!-- <div class="barContainer">
                      <div class="bar4"></div>
                    </div> -->
                  </div>
                  <div class="EdgeColumn rightText">
                    <div>${productRating.ratingArray[4]}</div>
                  </div>
                  <div class="EdgeColumn">
                    <div>3 star</div>
                  </div>
                  <div class="CentreColumn">
                    ★★★☆☆
                    <!-- <div class="barContainer">
                      <div class="bar3"></div>
                    </div> -->
                  </div>
                  <div class="EdgeColumn rightText">
                    <div>${productRating.ratingArray[3]}</div>
                  </div>
                  <div class="EdgeColumn">
                    <div>2 star</div>
                  </div>
                  <div class="CentreColumn">
                    ★★☆☆☆
                    <!-- <div class="barContainer">
                      <div class="bar2"></div>
                    </div> -->
                  </div>
                  <div class="EdgeColumn rightText">
                    <div>${productRating.ratingArray[2]}</div>
                  </div>
                  <div class="EdgeColumn">
                    <div>1 star</div>
                  </div>
                  <div class="CentreColumn">
                    ★☆☆☆☆
                    <!-- <div class="barContainer">
                      <div class="bar1"></div>
                    </div> -->
                  </div>
                  <div class="EdgeColumn rightText">
                    <div>${productRating.ratingArray[1]}</div>
                  </div>
                </div>
              </div>
            </span>
            <span class="wishlist rightCompartmentInner">
              <form action="/addProductToWishlistDefault" method="POST">
                ${t3}
                <input type="hidden" name="productID" value="${productData._id}">
              </form>
            </span>
            <span class="share rightCompartmentInner shareIcon">
              <i class="fa-regular fa-share-from-square" id="shareItem"></i>
            </span>
          </div>
        </div>
        ${t4}
        <p class="card-text">${productData.description.substring(0,50)+" ..."}</p>
      </div>
      <div class="jumbotron">
        <span class="pcVrtpriceCOmplete">
          <div class="pcVrtOriginalPrice"><s>₹${productData.price}</s></div>
          <div class="pcVrtPrice">₹${productData.discountedPrice.toFixed(2)} M.R.P</div>
        </span>
        <span class="pcVrtDiscount">${productData.discount}% off</span>
      </div>
    </div>
  </a>
    `
    str =str +t1;
  }
  document.getElementById("searchByAjaxDivDisplay").innerHTML = ``;
  document.getElementById("searchByAjaxDivDisplay").innerHTML = str;
}