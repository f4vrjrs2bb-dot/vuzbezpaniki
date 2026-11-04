
(function(){"use strict";
var toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
if(toggle&&nav){toggle.addEventListener("click",function(){var on=toggle.getAttribute("aria-expanded")!=="true";toggle.setAttribute("aria-expanded",String(on));nav.classList.toggle("open",on)});document.addEventListener("keydown",function(e){if(e.key==="Escape"){toggle.setAttribute("aria-expanded","false");nav.classList.remove("open")}})}
var reveals=document.querySelectorAll(".reveal");if("IntersectionObserver" in window&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var ob=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}})},{threshold:.08});reveals.forEach(function(e){ob.observe(e)})}else{reveals.forEach(function(e){e.classList.add("visible")})}
var search=document.getElementById("search"),questions=document.querySelectorAll(".faq[data-category]"),filters=document.querySelectorAll("[data-qa-filter]"),count=document.getElementById("count"),empty=document.getElementById("empty"),current="all";
function norm(s){return String(s||"").toLocaleLowerCase("ru").replace(/ё/g,"е")}
function showQA(){var term=norm(search?search.value:"").trim(),n=0;questions.forEach(function(el){var show=(current==="all"||el.dataset.category===current)&&norm(el.textContent).includes(term);el.hidden=!show;if(show)n++});if(count)count.textContent="Найдено: "+n;if(empty)empty.hidden=n!==0}
if(search){search.addEventListener("input",showQA);filters.forEach(function(b){b.addEventListener("click",function(){current=b.dataset.qaFilter;filters.forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});showQA()})});showQA()}
var steps=document.querySelectorAll(".step input"),progress=document.getElementById("progress"),progressBar=document.getElementById("progress-bar"),reset=document.getElementById("reset-steps");if(steps.length){var saved=[];try{saved=JSON.parse(localStorage.getItem("vuzbezpaniki-checklist-3")||"[]")}catch(e){};steps.forEach(function(el,i){el.checked=!!saved[i];el.addEventListener("change",update)});function update(){var n=Array.from(steps).filter(function(x){return x.checked}).length;if(progress)progress.textContent=n+" из "+steps.length+" шагов";if(progressBar)progressBar.style.width=(100*n/steps.length)+"%";try{localStorage.setItem("vuzbezpaniki-checklist-3",JSON.stringify(Array.from(steps).map(function(x){return x.checked})))}catch(e){}}if(reset)reset.addEventListener("click",function(){steps.forEach(function(x){x.checked=false});update()});update()}
var ids=["tuition","years","rent","food","transport","other"].map(function(id){return document.getElementById(id)});if(ids.every(Boolean)){function currency(n){return Math.round(n).toLocaleString("ru-RU")+" ₽"}function calc(){var v=ids.map(function(x){return Math.max(0,Number(x.value)||0)}),years=Math.max(1,Math.min(10,v[1]||1)),education=v[0]*years,monthly=v[2]+v[3]+v[4]+v[5],living=monthly*12*years;document.getElementById("total").textContent=currency(education+living);document.getElementById("education").textContent=currency(education);document.getElementById("living").textContent=currency(living);document.getElementById("monthly").textContent=currency(monthly)}ids.forEach(function(x){x.addEventListener("input",calc)});calc()}
var uniFilters=document.querySelectorAll("[data-uni-filter]"),unis=document.querySelectorAll(".uni[data-tags]"),uc=document.getElementById("uni-count");if(uniFilters.length){uniFilters.forEach(function(b){b.addEventListener("click",function(){var value=b.dataset.uniFilter,n=0;uniFilters.forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});unis.forEach(function(el){var show=value==="all"||el.dataset.tags.split(" ").includes(value);el.hidden=!show;if(show)n++});if(uc)uc.textContent="Показано: "+n})})}
var quiz=document.getElementById("quiz"),next=document.getElementById("next-quiz");if(quiz&&next){var cases=[
{q:"На первой паре ты почти ничего не понял. Что дальше?",a:["Молчу до сессии — вдруг само станет понятно","Спрошу у одногруппников, где материалы, и уточню у преподавателя","Найду случайное видео и больше ничего не проверю"],f:["Ожидание до сессии может превратить маленький пробел в большой. Лучше уточнить материал раньше.","Рабочий вариант: материалы курса, записи и один конкретный вопрос преподавателю помогают быстро разобраться.","Видео бывают полезны, но важно сверить тему с учебной программой и требованиями преподавателя."]},
{q:"Пары идут в двух разных корпусах. Как планируешь день?",a:["Проверю официальное расписание и дорогу заранее","Ориентируюсь только на сообщения в случайном чате","Пойду по адресу главного корпуса"],f:["Отличная привычка: адреса и расписание в начале семестра иногда меняются.","Чаты помогают, но сведения из учебного расписания надёжнее слухов.","Корпус может быть далеко от главного здания. Уточни адрес программы и конкретных пар."]},
{q:"С группой пока не сложилось общение. Твои действия?",a:["Решу, что друзей здесь не будет","Попробую познакомиться с одним человеком или посетить клуб","Буду думать, что у всех уже есть компания, кроме меня"],f:["Один день не определяет всю студенческую жизнь. Знакомства складываются постепенно.","Необязательно быть самым общительным. Начать с одного спокойного разговора — нормально.","Люди часто тоже чувствуют неловкость. Общие занятия дают новые поводы познакомиться."]},
{q:"В договоре на платное есть непонятный пункт. Что делать?",a:["Подписать, не читая — все так делают","Попросить письменное объяснение и сохранить документы","Проверить только договор знакомого из другого вуза"],f:["Перед подписью важно понимать стоимость, индексацию, оплату и прекращение договора.","Да, лучше прояснить текст своего договора до подписания и сохранить ответ.","Договоры отличаются, поэтому сравнение может помочь, но свой текст важнее."]},
{q:"Перед сессией в чате говорят, что «отчислят всех». Как проверить?",a:["Найду правила аттестации и требования преподавателя","Поверю слухам и перестану готовиться","Буду рассчитывать только на рассказ старшекурсника"],f:["Самый полезный шаг — проверить актуальный регламент и критерии оценивания.","Слухи усиливают тревогу и не заменяют конкретные правила.","Чужой опыт полезен, но формат и преподаватель могли измениться. Лучше сочетать опыт и документы."]}
],index=0;function render(){if(index>=cases.length){quiz.innerHTML="<span class='quiz-counter'>Готово: 5 из 5</span><h2>Ты разобрался с типичными ситуациями.</h2><p>Здесь не экзамен: главное — уметь спрашивать, сверять факты и находить поддержку.</p>";next.hidden=false;next.textContent="Пройти снова";next.onclick=function(){index=0;render()};return}var c=cases[index];quiz.innerHTML="";var counter=document.createElement("span");counter.className="quiz-counter";counter.textContent="Ситуация "+(index+1)+" / "+cases.length;var title=document.createElement("h2");title.textContent=c.q;var list=document.createElement("div");list.className="choice-list";var feedback=document.createElement("div");feedback.className="feedback";feedback.hidden=true;var strong=document.createElement("b");strong.textContent="Что важно учесть";var p=document.createElement("span");feedback.append(strong,p);c.a.forEach(function(t,i){var b=document.createElement("button");b.className="choice";b.type="button";b.textContent=t;b.addEventListener("click",function(){list.querySelectorAll("button").forEach(function(x){x.classList.remove("selected")});b.classList.add("selected");p.textContent=c.f[i];feedback.hidden=false;next.hidden=false});list.appendChild(b)});quiz.append(counter,title,list,feedback);next.hidden=true;next.textContent="Следующая ситуация →";next.onclick=function(){index++;render()}}render()}
var query=new URLSearchParams(location.search);if(query.get("type")==="story"){var kind=document.getElementById("kind");if(kind)kind.value="История студента"}
var form=document.getElementById("question-form"),status=document.getElementById("form-status");if(form){form.addEventListener("submit",function(e){e.preventDefault();if(!form.reportValidity())return;var kind=document.getElementById("kind").value,msg=document.getElementById("message").value.trim(),reply=document.getElementById("reply").value.trim();if(msg.length<15){status.hidden=false;status.textContent="Напиши хотя бы 15 символов, чтобы мы поняли вопрос.";return}var subject="ВУЗ БЕЗ ПАНИКИ — "+kind,body="Тема: "+kind+"\n\n"+msg+(reply?"\n\nАдрес для ответа: "+reply:"");var link="mailto:morkovkkk.a@mail.ru?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);var open=document.getElementById("mail-link");open.href=link;open.hidden=false;status.hidden=false;status.textContent="Письмо подготовлено. Нажми «Открыть письмо» и отправь его в почтовом приложении. Пока ты не отправишь его там, мы ничего не получим.";open.focus()})}

/* Tiny, original meme remixes; all information still lives in the educational sections. */
var memeButton=document.getElementById("meme-next");
if(memeButton){
var memes=[
{tag:"вот такие дела, собачка // remix",title:"ВОТ ТАКИЕ ДЕЛА, ПЕРВОКУРСНИК.",text:"Когда пришёл в главный корпус, а твои пары в другом конце Петербурга.",icons:["🐯","🐶"]},
{tag:"я тебя могну // remix",title:"СЕССИЯ: «Я ТЕБЯ МОГНУ».",text:"Ты: «Окей, а где узнать правила пересдачи?»",icons:["📚","🥲"]},
{tag:"сикс-севен // remix",title:"6–7 ВКЛАДОК. НОЛЬ ЯСНОСТИ.",text:"Когда читаешь про поступление, но забыл, что существует чек-лист.",icons:["💻","🫠"]},
{tag:"можно. а зачем? // remix",title:"ВЫБРАТЬ ВУЗ ПО ФАСАДУ?",text:"Можно. А зачем, если можно спросить студента о реальных парах и практике?",icons:["🏛️","🤨"]}
],memeIndex=0;
memeButton.addEventListener("click",function(){
memeIndex=(memeIndex+1)%memes.length;
var m=memes[memeIndex];
document.getElementById("meme-tag").textContent=m.tag;
document.getElementById("meme-title").textContent=m.title;
document.getElementById("meme-caption").textContent=m.text;
document.getElementById("meme-emoji-a").textContent=m.icons[0];
document.getElementById("meme-emoji-b").textContent=m.icons[1];
document.getElementById("meme-count").textContent=String(memeIndex+1).padStart(2,"0")+" / 04";
});
}
var antiPanic=document.getElementById("anti-panic"),antiPanicText=document.getElementById("anti-panic-text");
if(antiPanic&&antiPanicText){
var tips=[
"Шаг 1: не выбирай из сотни вузов. Сначала найди 2–3 программы, которые тебе интересны.",
"Не понимаешь, что делать дальше? Открой маршрут поступления и отметь один следующий шаг.",
"Один отзыв — это один опыт. Спрашивай студентов той же программы и курса.",
"Страшно пересдавать? Узнай правила своего вуза: факты полезнее слухов.",
"Не знаешь, сколько всё стоит? Начни со своего бюджета, а не чужих историй."
],tipIndex=-1;
antiPanic.addEventListener("click",function(){tipIndex=(tipIndex+1)%tips.length;antiPanicText.textContent=tips[tipIndex];antiPanicText.hidden=false});
}

})();
