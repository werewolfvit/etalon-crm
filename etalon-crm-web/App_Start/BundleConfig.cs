using System.Web;
using System.Web.Optimization;

namespace etalon_crm_web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/extjs").Include("~/Scripts/ext-all.js"));
            bundles.Add(new ScriptBundle("~/bundles/extjs-app").Include("~/app/Application.js"));

            bundles.Add(new StyleBundle("~/Content/extjs-css").Include("~/Content/CSS/extjs.css"));
        }
    }
}
