function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let hero = {
    hp: parseInt($('.hero #HP').text()),
    strength: parseInt($('.hero #Strength').text()),
    defence: parseInt($('.hero #Defence').text()),
    weapon: parseInt($('.hero #Weapon').text()),
    shield:  parseInt($('.hero #Shield').text()),
    potions: parseInt($('.hero #Potions').text())
};

let antagonist = {
    hp: parseInt($('.comp #HP').text()),
    strength: parseInt($('.comp #Strength').text()),
    defence: parseInt($('.comp #Defence').text()),
    weapon: parseInt($('.comp #Weapon').text())
};

let count = 1;
let defHeroCount = hero.defence;
let choosingComp = getRandomInt(2);
if (choosingComp == 0){
    hellhoundCreate();
}

function heroAttack() {
    let attackChance = getRandomInt(4);
    let damageHero = hero.strength + hero.weapon - antagonist.defence;
    let heroMessage;
    if (attackChance == 0){
        heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой не попал по антагонисту</div><div class="card-footer"></div></div>'); 
    }
    else {
        antagonist.hp -= damageHero;
        heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой нанес урон по антагонисту</div><div class="card-footer"></div></div>');
        heroMessage.find('.card-footer').text('Нанесенный урон: ' + damageHero);
        $('.comp #HP').text(antagonist.hp);
    }
    $('.message #hero-message').append(heroMessage);

    if(antagonist.hp <= 0 ){
        $('.container').remove()
        let newDiv = $('<div class="container"><div class="card border-0" style="top: 100px;"><img src="https://images.squarespace-cdn.com/content/v1/527a5a1ee4b0a1d397624466/1631846914854-J9AL069X2ED9U3JDKLDN/victory.jpeg" alt="victory" class="mx-auto"><div class="text-center fw-bold fs-1">Поздравляем, вы выиграли</div></div></div>');
        $('body').append(newDiv);
    }
}

function heroDefence() {
    hero.defence += hero.shield;
    let heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой поднял щит</div><div class="card-footer"></div></div>');
    heroMessage.find('.card-footer').text('Защита увеличилось на: ' + hero.shield);
    $('.hero #Defence').text(hero.defence);
    $('.message #hero-message').append(heroMessage);
}

function modifyHealth() {
    let heroMessage;
    if (hero.potions > 0){
        hero.hp += 500;
        hero.potions -= 1;
        heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой использоваль зелье, чтобы исцелиться</div><div class="card-footer"></div></div>');
        heroMessage.find('.card-footer').text('ХП увеличилось на: ' + 500);
        $('.hero #HP').text(hero.hp);
        $('.hero #Potions').text(hero.potions);
    }
    else {
        heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">У героя закончились зелья, он пропустил ход</div><div class="card-footer"></div></div>');
    }
    $('.message #hero-message').append(heroMessage);
}

function CompAttack() {
    let nameAntagonist = $('#comp-title').text();
    if (nameAntagonist == 'Дракон'){
        dragAttack();
    }
    else{
        hellAttack();
    }

    if(hero.hp <= 0 ){
        $('.container').remove();
        let newDiv = $('<div class="container"><div class="card border-0" style="top: 100px;"><img src="https://share.ftimg.com/aff/flamingtext/2020/06/14/flamingtext__26711040775136307.png" alt="victory" class="mx-auto"><div class="text-center fw-bold fs-1 text-danger">К сожаления, вы проиграли</div></div></div>');
        $('body').append(newDiv);
    }
}

function dragAttack() {
    let attackChance = getRandomInt(2);
    let compMessage;
    if (attackChance == 0){
        compMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Дракон</span></div><div class="card-body">Дракон не стал атаковать героя</div><div class="card-footer"></div></div>');  
    }
    else {
        let typeAttack = getRandomInt(2);
        if (typeAttack == 0){
            if (hero.defence != defHeroCount){
                    compMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Дракон</span></div><div class="card-body">Дракон атаковал огненным шаром, но герой защитился щитом</div><div class="card-footer"></div></div>');
            }
            else {
                let fireballDamage = antagonist.strength * 2 - hero.defence;
                hero.hp -= fireballDamage;
                compMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Дракон</span></div><div class="card-body">Дракон атаковал огненным шаром</div><div class="card-footer"></div></div>');
                compMessage.find('.card-footer').text('Нанесенный урон: ' + fireballDamage);
            }    
        }
        else {
            let damageComp = antagonist.strength + antagonist.weapon - hero.defence;
            hero.hp -= damageComp;
            compMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Дракон</span></div><div class="card-body">Дракон нанес урон по герою</div><div class="card-footer"></div></div>');
            compMessage.find('.card-footer').text('Нанесенный урон: ' + damageComp);
        }
    }
    $('.hero #HP').text(hero.hp);
    $('.message #comp-message').append(compMessage);
}

function hellAttack() {
    let attackChance = getRandomInt(2);
    let compMessage;
    if (attackChance == 0){
        compMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Адская гончая</span></div><div class="card-body">Адская гончая не стал атаковать героя</div><div class="card-footer"></div></div>');  
    }
    else {
        let damageComp = antagonist.strength + antagonist.weapon - hero.defence;
        hero.hp -= damageComp;
        compMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Адская гончая</span></div><div class="card-body">Адская гончая нанес урон по герою</div><div class="card-footer"></div></div>');
        compMessage.find('.card-footer').text('Нанесенный урон: ' + damageComp);
        $('.hero #HP').text(hero.hp);
    }
    $('.message #comp-message').append(compMessage);
}

function hellhoundCreate() {
    let imgHellhound = 'https://illustrators.ru/uploads/illustration/image/902855/main_%D0%B0%D0%B4%D1%81%D0%BA%D0%B0%D1%8F-%D0%B3%D0%BE%D0%BD%D1%87%D0%B0%D1%8F-1-%D0%B2%D0%B8%D0%B4.jpg';
    let img = $('#comp-img').attr('src', imgHellhound);
    $('#comp-title').text('Адская гончая');
    antagonist = {
        hp: 750,
        strength: 250,
        defence: 50,
        weapon: 100
    }
    $('.comp #HP').text(antagonist.hp);
    $('.comp #Strength').text(antagonist.strength);
    $('.comp #Defence').text(antagonist.defence);
    $('.comp #Weapon').text(antagonist.weapon);
}

function heroChoice() {
    let selectedAction = $('.form-select').val();
    if (selectedAction == 'Attack'){
        heroAttack();
    }
    else if (selectedAction == 'Defence'){
        heroDefence();
    }
    else if (selectedAction == 'Health'){
        modifyHealth();
    }
    else {
        let heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой не стал атаковать антагониста</div><div class="card-footer"></div></div>');  
        $('.message #hero-message').append(heroMessage);
    }
}

$('#choice').on('click', function(event) {
    event.preventDefault();
    $('#scoreboard').text(count++);
    $('.message #hero-message .card').remove();
    $('.message #comp-message .card').remove();
    if (hero.defence != defHeroCount){
        hero.defence -= hero.shield;
        $('.hero #Defence').text(hero.defence);
    }
    heroChoice();
    CompAttack();
});



