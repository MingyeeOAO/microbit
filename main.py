from lib.Vector import Vector2

v = Vector2(3, 4)

def on_forever():
    basic.show_number(len(v))
basic.forever(on_forever)
