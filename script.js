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

function heroAttack() {
    count++;
    scoreboard.text(count);

    let attackChance = getRandomInt(4);
    let heroStrength = parseInt(hero.strength);
    let heroWeapon = parseInt(hero.weapon);
    let dragonDefence = parseInt(dragon.defence);
    let damage = heroStrength + heroWeapon - dragonDefence;

    if (attackChance == 0){
        let heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой не попал по дракону</div><div class="card-footer"></div></div>');  
        $('.message #hero-message').append(heroMessage);
    }
    else {
        dragon.hp -= damage;
        let heroMessage = $('<div class="card"><div class="card-header"><span class="fw-bold">Герой</span></div><div class="card-body">Герой нанес урон по дракону</div><div class="card-footer"></div></div>');
        heroMessage.find('.card-footer').text(damage);
        $('.dragon #HP').text(dragon.hp);
        $('.message #hero-message').append(heroMessage);
    }
    if(dragon.hp <= 0 ){
        $('.container').remove()
        let newDiv = $('<div class="item">Поздравляем, вы выиграли</div>');
        $('body').append(newDiv);
    }
}

    $('#Attack').on('click', function(event) {
    event.preventDefault();
    $('.message #hero-message .card').remove();
    heroAttack();
});



