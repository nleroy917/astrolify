class Sentiment:
    """
    simple sentiment object
    """

    def __init__(self, sentiment=None, magnitude=None):
        self.sentiment = sentiment
        self.magnitude = magnitude


class Horoscope:
    """
    Horoscope class to store metadata about horoscopes
    """

    def __init__(self, date=None, content=None,
                 type=None, sign=None, source=None):
        """
        Create a new horoscope class with the following properties:
            -> date - date of the horoscope
            -> type - the type (Sun, Moon, or Rising)
            -> sign - the sign for the horoscope (e.g. Virgo, Scorpio, Cancer, Aries, etc)
            -> content - the actual horoscope text/content/reading
            -> source - the source of the horoscope
            -> sentiment - a sentiment object to store the sentiment and magnitude
        """
        self.date = date
        self.type = type
        self.sign = sign
        self.content = content
        self.source = source
        self.sentiment = Sentiment()

    def show(self):
        """
        Print the horoscope and it's contents to the command line
        TODO
        """
        pass
