using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using TemplateMongo.Model;

namespace TemplateMongo.Util
{
    public static class StringExtensions
    {
        public static bool ComparerToHash(this string plainText, string hashedText, Hash _hash)
        {
            byte[] salt = Convert.FromBase64String(_hash.Salt);            
            var pbkdf2 = new Rfc2898DeriveBytes(plainText, salt, _hash.Iterations);
            string hashAux = Convert.ToBase64String(pbkdf2.GetBytes(64));
            return hashAux.Equals(hashedText, StringComparison.Ordinal);
        }

        public static string hashText(this string plainText, Hash _hash)
        {
            byte[] salt = Util.GetSalt(_hash.SaltLength);
            _hash.Salt = Convert.ToBase64String(salt);
            var pbkdf2 = new Rfc2898DeriveBytes(plainText, salt, _hash.Iterations);
            string hashedText = Convert.ToBase64String(pbkdf2.GetBytes(64));
            return hashedText;
        }
    }
}
