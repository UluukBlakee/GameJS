function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let hero = {
    hp: $('.hero #HP').text(),
    strength:  $('.hero #Strength').text(),
    defence:  $('.hero #Defence').text(),
    weapon:  $('.hero #Weapon').text(),
    shield:  $('.hero #Shield').text()
};

let dragon = {
    hp: $('.dragon #HP').text(),
    strength:  $('.dragon #Strength').text(),
    defence:  $('.dragon #Defence').text(),
    weapon:  $('.dragon #Weapon').text(),
    shield:  $('.dragon #Shield').text()
};

let scoreboard = $('#scoreboard');
let count = 1;
let choice = $('#choice');

function heroAttack() {
    let attackChance = getRandomInt(4);
    let heroStrength = parseInt(hero.strength);
    let heroWeapon = parseInt(hero.weapon);
    let dragonDefence = parseInt(dragon.defence);
    let damageHero = heroStrength + heroWeapon - dragonDefence;

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

function dragonAttack() {
    let attackChance = getRandomInt(2);
    let dragStrength = parseInt(dragon.strength);
    let dragWeapon = parseInt(dragon.weapon);
    let heroDefence = parseInt(hero.defence);
    let damageDrag = dragStrength + dragWeapon - heroDefence;

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
    let selectedAction = $('.form-select').val();
    if (selectedAction == 'Attack'){
        heroAttack();
    }
    else if (selectedAction == 'Defence'){

    }
    dragonAttack();
});



