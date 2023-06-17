class GeocoderAdaptor:
    """
    An adaptor class to parse attraction data added from different geocoding platforms
    """
    def __init__(self) -> None:
        pass

    def parseMapboxAttraction(self, data):
        #name, type, lat, lon, address, description
        extracted = {
            "name": data['text'],
            "type": data['place_type'][0],
            "lat": data['center'][1],
            "lon": data['center'][0],
            "address": data['place_name'],
            "description": "mapbox"
        }
        return extracted