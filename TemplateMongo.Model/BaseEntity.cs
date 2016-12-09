using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using TemplateMongo.Model.Interfaces;

namespace TemplateMongo.Model
{
    public abstract class BsoDocument
    {
    }

    public class Entity : BsoDocument, IEntity
    {
        [BsonIgnore]
        public string Index { get; set; }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string MongoID { get; set; }        
    }
}
