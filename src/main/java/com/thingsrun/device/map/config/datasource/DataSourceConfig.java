package com.thingsrun.device.map.config.datasource;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.support.http.WebStatFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

	private final Logger LOG = LoggerFactory.getLogger(getClass());

	@Value("${spring.datasource.primary.jdbc.url}")
	private String jdbcUrl;
	@Value("${spring.datasource.primary.jdbc.driver-class-name}")
	private String jdbcDriver;
	@Value("${spring.datasource.primary.jdbc.username}")
	private String jdbcUserName;
	@Value("${spring.datasource.primary.jdbc.password}")
	private String jdbcPassword;
	
	@Value("${spring.datasource.primary.initialSize}")
	private Integer primaryInitialSize = 5;
	@Value("${spring.datasource.primary.maxActive}")
	private Integer primaryMaxActive = 20;
	@Value("${spring.datasource.primary.minIdle}")
	private Integer primaryMinIdle = 1;
	@Value("${spring.datasource.primary.maxWait}")
	private Integer primaryMaxWait = 60000;
	@Value("${spring.datasource.primary.validationQuery}")
	private String primaryValidationQuery;
	@Value("${spring.datasource.primary.testOnBorrow}")
	private Boolean primaryTestOnBorrow = false;
	@Value("${spring.datasource.primary.testOnReturn}")
	private Boolean primaryTestOnReturn = false;
	@Value("${spring.datasource.primary.testWhileIdle}")
	private Boolean primaryTestWhileIdle = true;
	@Value("${spring.datasource.primary.poolPreparedStatements}")
	private Boolean primaryPoolPreparedStatements = false;
	@Value("${spring.datasource.primary.maxOpenPreparedStatements}")
	private Integer primaryMaxOpenPreparedStatements = -1;
    @Value("${spring.datasource.filters}")
    private String filters;
    @Value("${spring.datasource.logSlowSql}")
    private String logSlowSql;
    @Value("${spring.datasource.druid.username}")
    private String druidUsername;
    @Value("${spring.datasource.druid.password}")
    private String druidUassword;

	@Bean(name="primaryDataSource")
	@Primary
	public DataSource eagleDataSource() {
		DruidDataSource ds = new DruidDataSource();

		try {
			ds.setUrl(jdbcUrl);
			ds.setDriverClassName(jdbcDriver);
			ds.setUsername(jdbcUserName);
			ds.setPassword(jdbcPassword);
			
			ds.setInitialSize(primaryInitialSize);
			ds.setMaxActive(primaryMaxActive);
			ds.setMinIdle(primaryMinIdle);
			ds.setMaxWait(primaryMaxWait);
			ds.setValidationQuery(primaryValidationQuery);
			ds.setTestOnBorrow(primaryTestOnBorrow);
			ds.setTestOnReturn(primaryTestOnReturn);
			ds.setTestWhileIdle(primaryTestWhileIdle);
			ds.setPoolPreparedStatements(primaryPoolPreparedStatements);
			ds.setMaxOpenPreparedStatements(primaryMaxOpenPreparedStatements);
			
			ds.setFilters(filters);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			return null;
		}

		return ds;
	}
	
	/*@Bean
    public ServletRegistrationBean druidServlet() {
        ServletRegistrationBean reg = new ServletRegistrationBean();
        reg.setServlet(new StatViewServlet());
        reg.addUrlMappings("/druid/*");
        reg.addInitParameter("loginUsername", druidUsername);
        reg.addInitParameter("loginPassword", druidUassword);
        reg.addInitParameter("logSlowSql", logSlowSql);
        return reg;
    }*/

    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean();
        filterRegistrationBean.setFilter(new WebStatFilter());
        filterRegistrationBean.addUrlPatterns("/*");
        filterRegistrationBean.addInitParameter("exclusions", "*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*");
        filterRegistrationBean.addInitParameter("profileEnable", "true");
        return filterRegistrationBean;
    }
	
	@Bean(name="jdbcTemplate")
	public JdbcTemplate jdbcTemplate(@Qualifier("primaryDataSource") DataSource dataSource){
		JdbcTemplate jdbcTemplate = new JdbcTemplate();
		jdbcTemplate.setDataSource(dataSource);
		return jdbcTemplate;
	}
}
