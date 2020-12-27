from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

class Driver():
    """
    driver for running db operations outside the main API
    """

    def __init__(self, db_uri):
        """
        Create new instance of the database driver object
        :param - db_uri: - uri for the database
        """
        self._db_uri = db_uri
        self._engine = create_engine(db_uri)
        self._Session = sessionmaker(bind=self._engine)
        self._session = self._Session()
    
    def query_all(self, model):
        """
        query all of a certain object + table
        """
        query = self._session.query(model)
        models = query.all()
        return [model.serialize for model in models]
    
    def __del__(self):
        self._session.close()

