using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(etalon_crm_web.Startup))]
namespace etalon_crm_web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
