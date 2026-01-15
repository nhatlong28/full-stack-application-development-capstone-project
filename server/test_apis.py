from djangoapp.restapis import get_request, analyze_review_sentiments

def test():
    print("Testing get_dealers:")
    dealers = get_request("/fetchDealers")
    print(dealers)
    
    print("\nTesting sentiment:")
    sentiment = analyze_review_sentiments("Fantastic services")
    print(sentiment)

if __name__ == "__main__":
    test()
