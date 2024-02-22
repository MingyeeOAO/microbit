# v = Vector2(1, 2)

def on_forever():
    basic.show_number(200)
basic.forever(on_forever)

class Vector2:
    def __init__(x= 0 :float, y=0 : float):
        self.x = x;
        self.y = y;

    def __add__(self, b):
        return Vector2(self.x+b.x, self.y+b.y)

    def __len__(self):
        return sqrt(self.x**2+self.y**2)