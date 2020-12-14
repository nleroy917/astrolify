# Imports the Google Cloud client library
from google.cloud import language_v1


class LanguageClient:
    """
    Class to interface the google natural language API

    Requires a google cloud platform account, project, and an API add on to be configured. In addition,
    the google authntication credentials for this service must be in the directory and an environment
    variable should be set pointing to these credentials.

        export GOOGLE_APPLICATION_CREDENTIALS="[PATH]"

    """
    # loads the environment from a .env file
    from dotenv import load_dotenv
    load_dotenv()

    def __init__(self):
        """
        create an instance of the class
        """

        # Instantiates a client
        self._client = language_v1.LanguageServiceClient()

    def _create_document(
            self, text, type_=language_v1.Document.Type.PLAIN_TEXT, language='en'):
        """
        Create a document object to analyze with the client

        :param text: - the text of the document - should be plain-text
        :param type_: the content type object taken from the language processing library.
                -> Available types: PLAIN_TEXT, HTML
        :param language: the language of the text.
                -> Optional. If not specified, the language is automatically detected.
                   For list of supported languages:
                   https://cloud.google.com/natural-language/docs/languages
        """

        return {"content": text, "type_": type_, "language": language}

    def get_sentiment(self, text):
        """
        Analyze the sentiment of some text

        :param text: - the text to analyze
        """
        doc = self._create_document(text)
        encoding_type = language_v1.EncodingType.UTF8

        # Detects the sentiment of the text
        return self._client.analyze_sentiment(
            request={'document': doc, 'encoding_type': encoding_type}).document_sentiment
    
    def get_entities(self,text):
        """
        Analyze and extract the entities in a piece of text

        :param text: - the text to analyze
        """

        doc = self._create_document(text)
        encoding_type = language_v1.EncodingType.UTF8
        
        return self._client.analyze_entities(
            request={'document': doc, 'encoding_type': encoding_type}).entities
