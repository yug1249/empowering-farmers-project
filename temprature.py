
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

app.route('/')
def index():
    return send_from_directory('', 'climatAnalysis.html')
    api_key = '141-316-694'  # Replace with your OpenWeatherMap API key
    location = request.args.get('location', 'London')  # Default location
    response = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={location}&appid={141-316-694}')
    weather_data = response.json()

    if response.status_code == 200:
        temperature = weather_data['main']['temp'] - 273.15  # Kelvin to Celsius
        humidity = weather_data['main']['humidity']
        advice = 'Good for farming' if 20 <= temperature <= 30 and humidity > 50 else 'Not optimal for farming'
        return jsonify({
            'temperature': f"{temperature:.2f} °C",
            'humidity': f"{humidity}%",
            'advice': advice
        })
    else:
        return jsonify({'error': 'Unable to fetch weather data. Please check the location or API key.'})

if __name__ == '__main__':
    app.run(debug=True)
