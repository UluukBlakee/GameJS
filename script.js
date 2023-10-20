function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let hero = {
    hp: parseInt($('.hero #HP').text()),
    strength: parseInt($('.hero #Strength').text()),
    defence: parseInt($('.hero #Defence').text()),
    weapon: parseInt($('.hero #Weapon').text()),
    shield:  parseInt($('.hero #Shield').text())
};

let dragon = {
    hp: parseInt($('.dragon #HP').text()),
    strength: parseInt($('.dragon #Strength').text()),
    defence: parseInt($('.dragon #Defence').text()),
    weapon: parseInt($('.dragon #Weapon').text())
};

let hellhound = {
    hp: 750,
    strength: 250,
    defence: 50,
    weapon: 100
}

let scoreboard = $('#scoreboard');
let count = 1;
let choice = $('#choice');

function heroAttack() {
    let attackChance = getRandomInt(4);
    let damageHero = hero.strength + hero.weapon - dragon.defence;

    if (attackChance == 0){
        let heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой не попал по дракону</div><div class="card-footer"></div></div>');  
        $('.message #hero-message').append(heroMessage);
    }
    else {
        dragon.hp -= damageHero;
        let heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой нанес урон по дракону</div><div class="card-footer"></div></div>');
        heroMessage.find('.card-footer').text('Нанесенный урон: ' + damageHero);
        $('.dragon #HP').text(dragon.hp);
        $('.message #hero-message').append(heroMessage);
    }

    if(dragon.hp <= 0 ){
        $('.container').remove()
        let newDiv = $('<div class="item">Поздравляем, вы выиграли</div>');
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

function dragonAttack() {
    let attackChance = getRandomInt(2);
    let damageDrag = dragon.strength + dragon.weapon - hero.defence;

    if (attackChance == 0){
        let dragMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Дракон</span></div><div class="card-body">Дракон не стал атаковать героя</div><div class="card-footer"></div></div>');  
        $('.message #dragon-message').append(dragMessage);
    }
    else {
        hero.hp -= damageDrag;
        let dragMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Дракон</span></div><div class="card-body">Дракон нанес урон по герою</div><div class="card-footer"></div></div>');
        dragMessage.find('.card-footer').text('Нанесенный урон: ' + damageDrag);
        $('.hero #HP').text(hero.hp);
        $('.message #dragon-message').append(dragMessage);
    }

    if(hero.hp <= 0 ){
        $('.container').remove()
        let newDiv = $('<div class="item">К сожаления вы проиграли</div>');
        $('body').append(newDiv);
    }
}

    choice.on('click', function(event) {
    event.preventDefault();
    scoreboard.text(count++);
    $('.message #hero-message .card').remove();
    $('.message #dragon-message .card').remove();
    if (hero.defence != 50){
        hero.defence -= hero.shield;
        $('.hero #Defence').text(hero.defence);
    }
    let selectedAction = $('.form-select').val();
    if (selectedAction == 'Attack'){
        heroAttack();
    }
    else if (selectedAction == 'Defence'){
        heroDefence();
    }
    else{
        let heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой не стал атаковать дракона</div><div class="card-footer"></div></div>');  
        $('.message #hero-message').append(heroMessage);
    }
    let choosingComp = getRandomInt(2);
    if (choosingComp == 0){
        dragonAttack();
    }
    else {

    }
});



