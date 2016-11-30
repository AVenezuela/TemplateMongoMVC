using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace System.Web.Mvc
{
    public static class ModelStateDictionaryExtensions
    {
        public static void RemoveItemsContainsKey(this ModelStateDictionary dictionary, string key)
        {
            List<string> keysToRemove = new List<string>();
            dictionary.Keys.ToList().ForEach((keyitem) => {
                if (keyitem.Contains(key))
                    keysToRemove.Add(keyitem);
            });
            keysToRemove.ForEach((k) => dictionary.Remove(k));
        }
    }
}
