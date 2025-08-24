import{a as u,S as m,i as y}from"./assets/vendor-BBSqv8W6.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();u.defaults.baseURL="https://pixabay.com/api/";const l=document.querySelector(".app-form"),d=document.querySelector(".gallery"),p=document.querySelector(".btn-prev"),f=document.querySelector(".btn-next"),g=new m(".gallery a",{}),h=10;let a=1;const c=async()=>{d.innerHTML="";const o=l.elements.search.value;console.log(o),await u.get("https://pixabay.com/api/",{params:{key:"49373653-d22f76e72713087fcf9bb4de1",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:h}}).then(s=>{const r=s.data.hits;console.log(r.length);const n=s.data.totalHits;r.length===0?y.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(r.forEach(e=>{d.innerHTML+=` 
                    <li class="gallery-item">
                        <a href="${e.largeImageURL}" class="image">
                        <img src="${e.webformatURL}" width="360" height="200" alt="${e.tags}"/>
                        </a>
                        <div class="content">
                            <div class="info">
                                <h5 class="key">Likes</h5>
                                <p class="value">${e.likes}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Views</h5>
                                <p class="value">${e.views}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Comments</h5>
                                <p class="value">${e.comments}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Downloads</h5>
                                <p class="value">${e.downloads}</p>
                            </div>
                        </div>
                    </li>`}),g.refresh(),v(n))}).catch(s=>{console.error(s)})};l.addEventListener("submit",o=>{o.preventDefault(),c(),l.elements.search.value=""});const v=o=>{const s=Math.ceil(o/h);f.style.display=a<s?"block":"none",p.style.display=a>1?"block":"none"};f.addEventListener("click",()=>{a++,c()});p.addEventListener("click",()=>{a--,c()});
//# sourceMappingURL=index.js.map
