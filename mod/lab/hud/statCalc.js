const FQ = 2

let timer = FQ

function calcStat() {

    const teams = []
    for (let i = 1; i <= env.tune.teams; i++) {
        teams[i] = {
            id:    i,
            name:  'colony ' + i,
            cells: 0,
            hp:    0,
            icon:  env.teams[i]? env.teams[i].img : null,
        }
    }

    let hp = 0
    let cells = 0
    lab.pond._ls.forEach(e => {
        if (e instanceof dna.pond.Cell) {
            cells ++
            hp += e.hp
            teams[e.team].cells ++
            teams[e.team].hp += e.hp
        }
    })

    let food = 0
    let foodHP = 0
    lab.pond.food._ls.forEach(f => {
        if ((!f instanceof dna.pond.Food) || f.dead) return
        food ++
        foodHP += f.hp
    })

    lab.hud.info.set('cells', '' + cells)
    lab.hud.info.set('hp', `${hp}/${hp + foodHP}`)
    lab.hud.info.set('food', `${food}/${foodHP}`)
    teams.forEach(team => {
        if (team.cells > 0 || lab.hud.info.isSet(team.name)) {
            lab.hud.info.set(team.name, '' + team.cells + '/' + team.hp, team.icon)
        }
    })
}

function evo(dt) {
    timer -= dt
    if (timer < 0) {
        this.calcStat()
        timer = FQ
    }
}
