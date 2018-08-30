using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TestWebApp.Contexts;
using TestWebApp.NotificationsHubs;
using Microsoft.EntityFrameworkCore;
using TestWebApp.Repositories;
using Autofac;
using System.Reflection;
using Autofac.Extensions.DependencyInjection;
using Autofac.Builder;
using Autofac.Features.Scanning;
using Microsoft.AspNetCore.SignalR;

namespace TestWebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });


            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSignalR();
            services.AddEntityFrameworkSqlServer();
            var connectionString = Configuration.GetConnectionString("HeroesConnection");
            services.AddDbContext<HeroesContext>(options => options.UseSqlServer(connectionString),ServiceLifetime.Scoped);


            var containerBuilder = new ContainerBuilder();

            // Configure SignalR hubs for dependency injection
            containerBuilder.RegisterSignalRHubs(typeof(Startup).GetTypeInfo().Assembly);

            containerBuilder.Populate(services);

            containerBuilder.RegisterType<HeroesRepository>().As<IHeroesRepository>().SingleInstance();
            containerBuilder.RegisterType<NotificationRepository>().As<INotificationService>().SingleInstance();

            var container = containerBuilder.Build();
            return new AutofacServiceProvider(container);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseCookiePolicy();

            app.UseMvc();

            app.UseSignalR(builder =>
            {
                builder.MapHub<HeroesNotificationHub>("/notificationService");
            });
        }
    }

    public static class AutoFacExtensions
    {
        public static IRegistrationBuilder<object, ScanningActivatorData, DynamicRegistrationStyle> RegisterSignalRHubs(this ContainerBuilder builder, params Assembly[] assemblies)
        {
            return builder.RegisterAssemblyTypes(assemblies)
                .Where(t => typeof(Hub).IsAssignableFrom(t))
                .ExternallyOwned();
        }
    }
}
