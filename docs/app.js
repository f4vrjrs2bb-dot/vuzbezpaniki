
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
var uniFilters=document.querySelectorAll("[data-uni-filter]"),unis=document.querySelectorAll(".uni[data-tags]"),uc=document.getElementById("uni-count"),uniSearch=document.getElementById("uni-search"),uniEmpty=document.getElementById("uni-empty"),uniCategory="all";
function filterUniversities(){var term=norm(uniSearch?uniSearch.value:"").trim(),n=0;unis.forEach(function(el){var tags=el.dataset.tags.split(" "),words=norm(el.dataset.search||el.textContent);var show=(uniCategory==="all"||tags.includes(uniCategory))&&words.includes(term);el.hidden=!show;if(show)n++});if(uc)uc.textContent="Показано: "+n+" из "+unis.length;if(uniEmpty)uniEmpty.hidden=n!==0}
if(uniFilters.length){uniFilters.forEach(function(b){b.addEventListener("click",function(){uniCategory=b.dataset.uniFilter;uniFilters.forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});filterUniversities()})});if(uniSearch)uniSearch.addEventListener("input",filterUniversities);filterUniversities()}
var quiz=document.getElementById("quiz"),next=document.getElementById("next-quiz");if(quiz&&next){var cases=[
{q:"На первой паре ты почти ничего не понял. Что дальше?",a:["Молчу до сессии — вдруг само станет понятно","Спрошу у одногруппников, где материалы, и уточню у преподавателя","Найду случайное видео и больше ничего не проверю"],f:["Ожидание до сессии может превратить маленький пробел в большой. Лучше уточнить материал раньше.","Рабочий вариант: материалы курса, записи и один конкретный вопрос преподавателю помогают быстро разобраться.","Видео бывают полезны, но важно сверить тему с учебной программой и требованиями преподавателя."]},
{q:"Пары идут в двух разных корпусах. Как планируешь день?",a:["Проверю официальное расписание и дорогу заранее","Ориентируюсь только на сообщения в случайном чате","Пойду по адресу главного корпуса"],f:["Отличная привычка: адреса и расписание в начале семестра иногда меняются.","Чаты помогают, но сведения из учебного расписания надёжнее слухов.","Корпус может быть далеко от главного здания. Уточни адрес программы и конкретных пар."]},
{q:"С группой пока не сложилось общение. Твои действия?",a:["Решу, что друзей здесь не будет","Попробую познакомиться с одним человеком или посетить клуб","Буду думать, что у всех уже есть компания, кроме меня"],f:["Один день не определяет всю студенческую жизнь. Знакомства складываются постепенно.","Необязательно быть самым общительным. Начать с одного спокойного разговора — нормально.","Люди часто тоже чувствуют неловкость. Общие занятия дают новые поводы познакомиться."]},
{q:"В договоре на платное есть непонятный пункт. Что делать?",a:["Подписать, не читая — все так делают","Попросить письменное объяснение и сохранить документы","Проверить только договор знакомого из другого вуза"],f:["Перед подписью важно понимать стоимость, индексацию, оплату и прекращение договора.","Да, лучше прояснить текст своего договора до подписания и сохранить ответ.","Договоры отличаются, поэтому сравнение может помочь, но свой текст важнее."]},
{q:"Перед сессией в чате говорят, что «отчислят всех». Как проверить?",a:["Найду правила аттестации и требования преподавателя","Поверю слухам и перестану готовиться","Буду рассчитывать только на рассказ старшекурсника"],f:["Самый полезный шаг — проверить актуальный регламент и критерии оценивания.","Слухи усиливают тревогу и не заменяют конкретные правила.","Чужой опыт полезен, но формат и преподаватель могли измениться. Лучше сочетать опыт и документы."]}
],index=0;function render(){if(index>=cases.length){quiz.innerHTML="<span class='quiz-counter'>Готово: 5 из 5</span><h2>Ты разобрался с типичными ситуациями.</h2><p>Здесь не экзамен: главное — уметь спрашивать, сверять факты и находить поддержку.</p>";next.hidden=false;next.textContent="Пройти снова";next.onclick=function(){index=0;render()};return}var c=cases[index];quiz.innerHTML="";var counter=document.createElement("span");counter.className="quiz-counter";counter.textContent="Ситуация "+(index+1)+" / "+cases.length;var title=document.createElement("h2");title.textContent=c.q;var list=document.createElement("div");list.className="choice-list";var feedback=document.createElement("div");feedback.className="feedback";feedback.hidden=true;var strong=document.createElement("b");strong.textContent="Что важно учесть";var p=document.createElement("span");feedback.append(strong,p);c.a.forEach(function(t,i){var b=document.createElement("button");b.className="choice";b.type="button";b.textContent=t;b.addEventListener("click",function(){list.querySelectorAll("button").forEach(function(x){x.classList.remove("selected")});b.classList.add("selected");p.textContent=c.f[i];feedback.hidden=false;next.hidden=false});list.appendChild(b)});quiz.append(counter,title,list,feedback);next.hidden=true;next.textContent="Следующая ситуация →";next.onclick=function(){index++;render()}}render()}
var query=new URLSearchParams(location.search);var selectedUni=query.get("uni");if(selectedUni){var messageInput=document.getElementById("message");if(messageInput&&!messageInput.value.trim())messageInput.value="Меня интересует "+selectedUni+". Можете рассказать, как там устроена учёба и какая нагрузка у студентов?";}if(query.get("type")==="story"){var kind=document.getElementById("kind");if(kind)kind.value="История студента"}
var form=document.getElementById("question-form"),status=document.getElementById("form-status");if(form){form.addEventListener("submit",function(e){e.preventDefault();if(!form.reportValidity())return;var kind=document.getElementById("kind").value,msg=document.getElementById("message").value.trim(),reply=document.getElementById("reply").value.trim();if(msg.length<15){status.hidden=false;status.textContent="Напиши хотя бы 15 символов, чтобы мы поняли вопрос.";return}var subject="ВУЗ БЕЗ ПАНИКИ — "+kind,body="Тема: "+kind+"\n\n"+msg+(reply?"\n\nАдрес для ответа: "+reply:"");var link="mailto:morkovkkk.a@mail.ru?subject="+encodeURIComponent(subject)+"&body="+encodeURIComponent(body);var open=document.getElementById("mail-link");open.href=link;open.hidden=false;status.hidden=false;status.textContent="Письмо подготовлено. Нажми «Открыть письмо» и отправь его в почтовом приложении. Пока ты не отправишь его там, мы ничего не получим.";open.focus()})}

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


/* Short original text remixes of 2026 meme formats, no third-party images. */
(function(){
var more=document.getElementById("more-memes"),grid=document.getElementById("meme26-grid");if(!more||!grid)return;
var data=[{"m":"МОЖНО. А ЗАЧЕМ?","q":"Выбирать университет по самому красивому корпусу?","r":"Можно. А зачем, если есть учебный план?","url":"./vuzy.html","label":"выбор"},{"m":"ВОТ ТАКИЕ ДЕЛА, СОБАЧКА","q":"Думал, все занятия в главном корпусе.","r":"А твой корпус вообще в другом районе.","url":"./vuzy.html","label":"питер"},{"m":"Я ТЕБЯ МОГНУ","q":"Сессия смотрит на тебя в конце семестра.","r":"Ты уже открыл правила пересдачи. Без паники.","url":"./bez-filtrov.html","label":"сессия"},{"m":"НИШЕВОСТЬ","q":"Планировал выбрать вуз за десять минут.","r":"Через два часа сравниваешь программы по практикам.","url":"./rentgen.html","label":"поиск"},{"m":"ВЕРНИТЕ МОЙ 2016-Й","q":"Когда хочется расписание, которое не меняется.","r":"Проверяем актуальную версию, а не пересланный скрин.","url":"./perviy-kurs.html","label":"расписание"},{"m":"КОТОСТЬ","q":"Когда нашёл старшекурсника своего направления.","r":"Наконец-то вопросы по делу, а не реклама.","url":"./rentgen.html","label":"студенты"},{"m":"СИКС-СЕВЕН","q":"У тебя открыто шесть или семь вкладок с правилами.","r":"А нужен один понятный список шагов.","url":"./postuplenie.html","label":"дедлайны"},{"m":"ВОЗДУХАН","q":"Пришёл на день открытых дверей за конкретикой.","r":"А тебе уже сорок минут рассказывают про атмосферу.","url":"./rentgen.html","label":"опросник"}];
var current=0;
function paint(){
grid.textContent="";
data.slice(current,current+4).forEach(function(item,index){
 var card=document.createElement("article");card.className="meme26-card";
 var tag=document.createElement("span");tag.className="meme26-label";tag.textContent=item.label+" / "+String(current+index+1).padStart(2,"0");
 var h=document.createElement("h3");h.textContent=item.m;
 var q=document.createElement("p");q.className="meme26-question";q.textContent=item.q;
 var answer=document.createElement("p");answer.className="meme26-reply";answer.textContent=item.r;
 var a=document.createElement("a");a.href=item.url;a.textContent="Разобрать тему ↗";
 card.append(tag,h,q,answer,a);grid.appendChild(card)
})}
more.addEventListener("click",function(){current=current?0:4;paint()});
})();
(function(){
var topicsEl=document.getElementById("xray-topics"),optionsEl=document.getElementById("xray-options"),selectedEl=document.getElementById("xray-selected");
if(!topicsEl||!optionsEl||!selectedEl)return;
var groups=[
["Учёба и нагрузка",[
"Сколько часов в неделю у вас реально уходит на учёбу вне пар?",
"Какая дисциплина неожиданно оказалась самой сложной?",
"Сколько групповых проектов бывает за семестр?",
"На каких занятиях присутствие действительно обязательно?",
"Как часто меняется расписание и корпуса?",
"Где брать материалы, если пропустил лекцию?",
"Какой навык пришлось учить самостоятельно?",
"Что ты сделал бы иначе в свой первый семестр?"]],
["Преподаватели и сессия",[
"Какие требования преподаватели обычно объясняют не сразу?",
"Как в вашей программе устроены пересдачи?",
"На чём чаще всего заваливаются новички?",
"Можно ли прийти на консультацию и получить реальный ответ?",
"Есть ли объективные критерии для проектов и работ?",
"Как решают конфликт из-за оценки?",
"Как выглядит реальная подготовка к экзаменам?",
"Как найти контакт куратора, если возникла проблема?"]],
["Общежитие и быт",[
"В каком именно общежитии живут студенты вашей программы?",
"Сколько времени занимает дорога до корпуса?",
"Какие бытовые вещи лучше привезти с собой?",
"Какие правила посещения гостей и тишины?",
"Что происходит, если сосед по комнате мешает учиться?",
"Как решают вопросы с бытовыми поломками?",
"Какие неожиданные расходы появляются при заселении?",
"Насколько реально получить место при поступлении?"]],
["Деньги и подработка",[
"Сколько лично ты тратишь на питание и транспорт за месяц?",
"Есть ли неожиданные учебные расходы?",
"Реально ли совмещать вашу программу с подработкой?",
"В какие дни расписание особенно плотное?",
"Какие студенческие скидки ты действительно используешь?",
"Какой обязательный расход ты недооценил?",
"Что стоит проверить в договоре платного обучения?",
"Какая финансовая привычка помогла в первый год?"]],
["Люди и атмосфера",[
"Легко ли познакомиться с кем-то вне своей группы?",
"Как помогают первокурсникам привыкнуть к вузу?",
"Что делают студенческие клубы на практике?",
"Можно ли отказаться от мероприятий без давления?",
"Кто помогает решать конфликты в группе?",
"Где собираются студенты между парами?",
"Что тебе нравится в атмосфере, а что раздражает?",
"Стал бы ты выбирать эту программу ещё раз — и почему?"]],
["Практика и будущее",[
"Помогает ли вуз искать место практики?",
"Какие реальные проекты ты можешь показать в портфолио?",
"Насколько связаны предметы с работой по профессии?",
"Какие дополнительные навыки пришлось изучить самому?",
"Приходят ли практики из индустрии на занятия?",
"Получают ли студенты обратную связь по стажировкам?",
"Есть ли помощь с резюме или карьерой?",
"Что ты узнал о профессии только после поступления?"]]
];
var records=[],active=0,chosen=new Set(),key="vuzbezpaniki-xray-v1";
groups.forEach(function(g,i){g[1].forEach(function(q,j){records.push({id:i+"-"+j,text:q,group:g[0]})})});
try{var found=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(found))found.forEach(function(id){if(records.some(function(r){return r.id===id}))chosen.add(id)})}catch(e){}
function save(){try{localStorage.setItem(key,JSON.stringify([...chosen]))}catch(e){}}
function drawTopics(){topicsEl.textContent="";groups.forEach(function(g,i){var b=document.createElement("button");b.type="button";b.className="xray-topic";b.setAttribute("aria-pressed",String(i===active));b.textContent=g[0];b.addEventListener("click",function(){active=i;render()});topicsEl.appendChild(b)})}
function drawOptions(){optionsEl.textContent="";document.getElementById("xray-current").textContent=groups[active][0];records.filter(function(r){return r.id.startsWith(active+"-")}).forEach(function(r){var b=document.createElement("button");b.type="button";b.className="xray-option";b.setAttribute("aria-pressed",String(chosen.has(r.id)));var label=document.createElement("span");label.textContent=r.text;var mark=document.createElement("span");mark.className="xray-plus";mark.textContent=chosen.has(r.id)?"✓":"+";b.append(label,mark);b.addEventListener("click",function(){if(chosen.has(r.id))chosen.delete(r.id);else chosen.add(r.id);save();render()});optionsEl.appendChild(b)})}
function drawSelected(){selectedEl.textContent="";var list=records.filter(function(r){return chosen.has(r.id)});document.getElementById("xray-total").textContent="Выбрано: "+list.length;document.getElementById("xray-count").textContent=list.length+" вопросов";if(!list.length){var emp=document.createElement("div");emp.className="xray-placeholder";emp.textContent="Пока пусто. Выбери вопросы слева — они появятся здесь.";selectedEl.appendChild(emp)}else{list.forEach(function(r,i){var el=document.createElement("div");el.className="xray-selected-row";var n=document.createElement("span");n.textContent=String(i+1).padStart(2,"0");var text=document.createElement("p");text.textContent=r.text;var del=document.createElement("button");del.type="button";del.textContent="×";del.setAttribute("aria-label","Убрать вопрос: "+r.text);del.addEventListener("click",function(){chosen.delete(r.id);save();render()});el.append(n,text,del);selectedEl.appendChild(el)})}}
function render(){drawTopics();drawOptions();drawSelected()}
function status(msg){var el=document.getElementById("xray-status");if(el)el.textContent=msg}
document.getElementById("xray-clear").addEventListener("click",function(){chosen.clear();save();render();status("Список очищен")});
document.getElementById("xray-random").addEventListener("click",function(){chosen.clear();groups.forEach(function(g,i){var j=Math.floor(Math.random()*g[1].length);chosen.add(i+"-"+j)});save();render();status("Добавлено шесть вопросов — по одному из каждой темы")});
document.getElementById("xray-copy").addEventListener("click",async function(){var list=records.filter(function(r){return chosen.has(r.id)});if(!list.length){status("Сначала выбери хотя бы один вопрос.");return}var output="МОИ ВОПРОСЫ СТУДЕНТУ — ВУЗ БЕЗ ПАНИКИ\n\n"+list.map(function(r,i){return(i+1)+". "+r.text}).join("\n")+"\n\nПроверяй факты в официальных источниках.";try{if(!navigator.clipboard||!navigator.clipboard.writeText)throw Error("Clipboard not supported");await navigator.clipboard.writeText(output);status("Список скопирован — можешь отправить его студенту.")}catch(e){var box=document.createElement("textarea");box.value=output;box.className="xray-copy-fallback";box.setAttribute("aria-label","Скопируй готовый список");selectedEl.prepend(box);box.focus();box.select();status("Не удалось скопировать автоматически. Выделенный текст можно скопировать вручную.")}});
render();
})();