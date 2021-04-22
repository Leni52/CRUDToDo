using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;

namespace TodoSample
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureServices((ctx, services) => { services.AddControllers(); });
                    webBuilder.Configure(app =>
                    {
                        app.UseFileServer();
                        app.UseRouting();
                        app.UseEndpoints(endpoints=> { endpoints.MapDefaultControllerRoute(); });
                    });
                })
                .Build()
                .Run();
        }
    }
}
