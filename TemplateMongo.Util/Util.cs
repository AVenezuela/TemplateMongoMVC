using System;
using System.Security.Cryptography;
using System.Web.Mvc;

namespace TemplateMongo.Util
{
    public static class Util
    {
        public static int getSaltLength()
        {
            int[] range = new int[] { 8, 16, 32 };
            int random = new Random().Next(0, range.Length);
            return range[random];
        }

       public static byte[] GetSalt(int saltLength)
        {
            var salt = new byte[saltLength];
            using (RNGCryptoServiceProvider random = new RNGCryptoServiceProvider())
            {
                random.GetNonZeroBytes(salt);
            }
            return salt;
        }
    }
}
