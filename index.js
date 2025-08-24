import{a as f,S as g,i as p}from"./assets/vendor-BBSqv8W6.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();f.defaults.baseURL="https://pixabay.com/api/";const c=document.querySelector(".app-form"),h=document.querySelector(".gallery"),m=document.querySelector(".btn-prev"),d=document.querySelector(".btn-next"),v=new g(".gallery a",{}),y=10;let o=1,i="";const u=async()=>{if(!i){p.warning({title:"Uyarı",message:"Lütfen bir arama terimi girin.",position:"topRight"});return}await f.get("https://pixabay.com/api/",{params:{key:"49373653-d22f76e72713087fcf9bb4de1",q:i,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:y}}).then(r=>{const a=r.data.hits;console.log(a.length);const n=r.data.totalHits;a.length===0?(d.style.display="none",p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})):(a.forEach(s=>{h.innerHTML+=` 
                    <li class="gallery-item">
                        <a href="${s.largeImageURL}" class="image">
                        <img src="${s.webformatURL}" width="360" height="200" alt="${s.tags}"/>
                        </a>
                        <div class="content">
                            <div class="info">
                                <h5 class="key">Likes</h5>
                                <p class="value">${s.likes}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Views</h5>
                                <p class="value">${s.views}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Comments</h5>
                                <p class="value">${s.comments}</p>
                            </div>
                            <div class="info">
                                <h5 class="key">Downloads</h5>
                                <p class="value">${s.downloads}</p>
                            </div>
                        </div>
                    </li>`}),v.refresh(),b(n))}).catch(r=>{console.error(r)})};c.addEventListener("submit",r=>{r.preventDefault(),i=c.elements.search.value.trim(),o=1,h.innerHTML="",u(),c.elements.search.value=""});const b=r=>{const a=Math.ceil(r/y);d.style.display=o<a?"block":"none",m.style.display=o>1?"block":"none"};d.addEventListener("click",()=>{i&&(o++,u())});m.addEventListener("click",()=>{!i||o===1||(o--,u())});
//# sourceMappingURL=index.js.map
