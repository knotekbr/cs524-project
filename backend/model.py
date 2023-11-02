from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, Text, CheckConstraint, TIMESTAMP, UniqueConstraint
from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy_utils import PasswordType, URLType, force_auto_coercion, observes, LtreeType, ArrowType, IntRangeType, JSONType, ChoiceType
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method
from sqlalchemy.dialects.postgresql import BYTEA  # assuming Postgres for BLOB type

Base = declarative_base()

class User(Base):
    __tablename__ = 'User'
    
    UserID = Column(Integer, primary_key=True)
    Username = Column(String(255), nullable=False)
    Email = Column(String(255), unique=True, nullable=False)
    PasswordHash = Column(String(255))
    FaceRecognitionData = Column(BYTEA)
    Score = Column(Integer)

    games_hosted = relationship("Game", backref="host", foreign_keys="Game.HostID")
    games_played = relationship("GamePlayer", backref="player")


class Game(Base):
    __tablename__ = 'Game'
    
    GameID = Column(Integer, primary_key=True)
    HostID = Column(Integer, ForeignKey('User.UserID'))
    Title = Column(String(255), nullable=False)
    Description = Column(Text)
    Status = Column(String(20), nullable=False)
    
    players = relationship("GamePlayer", backref="game")
    events = relationship("GameEvent", backref="game")


class QuestionCategory(Base):
    __tablename__ = 'QuestionCategory'
    
    CategoryID = Column(Integer, primary_key=True)
    CategoryName = Column(String(255), nullable=False)
    
    questions = relationship("Question", backref="category")


class Question(Base):
    __tablename__ = 'Question'
    
    QuestionID = Column(Integer, primary_key=True)
    Content = Column(Text, nullable=False)
    CategoryID = Column(Integer, ForeignKey('QuestionCategory.CategoryID'))
    DifficultyLevel = Column(Integer, CheckConstraint('DifficultyLevel >= 1 AND DifficultyLevel <= 5'))
    
    answers = relationship("Answer", backref="question")


class Answer(Base):
    __tablename__ = 'Answer'
    
    AnswerID = Column(Integer, primary_key=True)
    Content = Column(Text, nullable=False)
    QuestionID = Column(Integer, ForeignKey('Question.QuestionID'))


class GameEvent(Base):
    __tablename__ = 'GameEvent'
    
    EventID = Column(Integer, primary_key=True)
    GameID = Column(Integer, ForeignKey('Game.GameID'))
    Timestamp = Column(TIMESTAMP, nullable=False)
    EventType = Column(String(255), nullable=False)
    EventData = Column(Text)


class GamePlayer(Base):
    __tablename__ = 'GamePlayer'
    
    GameID = Column(Integer, ForeignKey('Game.GameID'), primary_key=True)
    PlayerID = Column(Integer, ForeignKey('User.UserID'), primary_key=True)


# Example to create the tables
if __name__ == '__main__':
    engine = create_engine('sqlite:///your_database_name.db')  # change to your DB URL
    Base.metadata.create_all(engine)
