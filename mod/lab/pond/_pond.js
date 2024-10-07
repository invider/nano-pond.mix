const _pond = {
    Z:    11,
    DNA:  'SlideCamera',
    name: 'pond',
    w:    2000,
    h:    2000,
    minScale:        0.25,
    maxScale:        5,
    zoomSpeed:       1.2,
    zoomScrollSpeed: 1.8,
    zoomOnPlusMinus: true,

    speed:      ctx.width * .5,
    slideSpeed: ctx.width * .75,
    relativeEdge: .05,

    setTarget: function(x, y) {
        this.target = { x, y }
    },

    setViewTarget: function(vx, vy) {
        this.target = {
            x: this.lx(vx),
            y: this.ly(vy),
        }
    },

    lookAtCenter: function() {
        this.setTarget( this.w * .5, this.h * .5 )
    },

    jumpAtCenter: function() {
        this.x = this.w * .5
        this.y = this.h * .5
    },
    
    onShow: function() {
        log('showing pond')
        lab.hud.show()
    },

    onHide: function() {
        log('hiding pond')
        lab.hud.hide()
    },

    selfTarget: function() {
        if (this.target) return
        this.target = {
            x: this.x,
            y: this.y,
        }
    },

    spaceLeft: function() {
        return this.lx(0) > 0
    },

    spaceRight: function() {
        return this.lx(ctx.width) < this.w
    },

    spaceUp: function() {
        return this.ly(0) > 0
    }, 

    spaceDown: function() {
        return this.ly(ctx.height) < this.h
    },

    slideLeft: function(dt) {
        if (!this.spaceLeft()) return
        this.x -= (this.slideSpeed * dt) / this.scale
    },

    slideRight: function(dt) {
        if (!this.spaceRight()) return
        this.x += (this.slideSpeed * dt) / this.scale
    },

    slideUp: function(dt) {
        if (!this.spaceUp()) return
        this.y -= (this.slideSpeed * dt) / this.scale
    },

    slideDown: function(dt) {
        if (!this.spaceDown()) return
        this.y += (this.slideSpeed * dt) / this.scale
    },

    zoomIn: function(dt) {
        this.scaleTarget = max(this.scale / this.zoomScrollSpeed, this.minScale)
    },

    zoomOut: function(dt) {
        this.scaleTarget = min(this.scale * this.zoomScrollSpeed, this.maxScale)
    },

    evo: function(dt) {
        this._ls.forEach( e => {
            if (e.evo && !e.dead && !e.paused) e.evo(dt)
        })

        if (this.target) this.evoFollow(dt)

        if (this.keys[0]) {
            this.scale = min(this.scale * (1 + this.zoomSpeed * dt), this.maxScale)
        }
        if (this.keys[1]) {
            this.scale = max(this.scale * (1 - this.zoomSpeed * dt), this.minScale)
        }

        if (this.scaleTarget) {
            if (this.scale < this.scaleTarget) {
                this.scale *= 1 + this.zoomSpeed * dt
                if (this.scale > this.scaleTarget) {
                    this.scale = this.scaleTarget
                    this.scaleTarget = 0
                }

            } else if (this.scale > this.scaleTarget) {
                this.scale *= 1 - this.zoomSpeed * dt
                if (this.scale < this.scaleTarget) {
                    this.scale = this.scaleTarget
                    this.scaleTarget = 0
                }
            }
        }
    },

    /*
    evoZoom: function(dt) {
        if (this.scale === this.targetScale) return
        if (this.scale < this.targetScale) {
            this.scale *= 1 + (this.scaleRate * dt)
            if (this.scale >= this.targetScale) this.scale = this.targetScale
        } else if (this.scale > this.targetScale) {
            this.scale /= 1 + (this.scaleRate * dt)
            if (this.scale <= this.targetScale) this.scale = this.targetScale
        }
    }
    */
}
