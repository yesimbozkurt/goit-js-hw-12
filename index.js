import{a as l,i as u,S as f}from"./assets/vendor-BBSqv8W6.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function c(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=c(e);fetch(e.href,s)}})();l.defaults.baseURL="https://pixabay.com/api/";const i=document.querySelector(".app-form"),n=document.querySelector(".gallery");document.querySelector(".btn-container");const h=document.querySelector(".btn"),p=i.elements.search.value,d=async()=>await l.get("https://pixabay.com/api/",{params:{key:"49373653-d22f76e72713087fcf9bb4de1",q:p,image_type:"photo",orientation:"horizontal",safesearch:!0}}).then(r=>{console.log(r.data.hits.length);const o=r.data.hits;o.length===0?u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):(o.forEach(t=>{console.log(t),n.innerHTML+=` 
                    <li class="gallery-item">
                        <a href="${t.largeImageURL}" class="image">
                        <img src="${t.webformatURL}" width="360" height="200" alt="${t.tags}"/>
                        </a>
                        <div class="content">
                            <div class="info">
                                <h5 class="key">Likes</h5>
                                <p class="value">${t.likes}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Views</h5>
                                <p class="value">${t.views}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Comments</h5>
                                <p class="value">${t.comments}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Downloads</h5>
                                <p class="value">${t.downloads}</p>
                            </div>
                        </div>
                    </li>`}),new f(".gallery a",{}).refresh())}).catch(r=>{console.error(r)});i.addEventListener("submit",r=>{r.preventDefault(),n.innerHTML="";const o=i.elements.search.value;console.log(o),d()});h.addEventListener("click",d);
//# sourceMappingURL=index.js.map
