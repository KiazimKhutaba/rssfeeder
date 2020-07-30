<?php
	
	function get_http_response_code($url) 
	{
		$headers = get_headers($url);
		return substr($headers[0], 9, 3);
	}

	
	function get_url($uri)
	{
		$endpointRegex = '/\/url\/(.*)?/';
	
		preg_match($endpointRegex, $uri, $matchedStrings);
	
		return $matchedStrings[1] ? $matchedStrings[1] : '';
	}
	
	
	
	function get_url_content($url) {
		
		// Create a stream
		$opts = [
			'http' => [
				'method' => "GET",
				'header' => "Accept-language: en\r\n" .
						"Cookie: foo=bar\r\n" .
						"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36 \r\n"
			]
		];

		$context = stream_context_create($opts);

		// Open the file using the HTTP headers set above
		$content = @file_get_contents($url, false, $context);
		
		return $content;
		
	}
	
	
	function set_cors_headers()
	{
		// array holding allowed Origin domains
		$allowedOrigins = array(
			"http://{$_SERVER['HTTP_HOST']}",
			'(http(s)://)?(www\.)?my\-domain\.com',
			'http://localhost:9090',
			'http://127.0.0.1:8080',
			'http://localhost:1234'
		);
		 
		if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] != '') {
		  foreach ($allowedOrigins as $allowedOrigin) {
			if (preg_match('#' . $allowedOrigin . '#', $_SERVER['HTTP_ORIGIN'])) {
			  header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
			  header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
			  header('Access-Control-Max-Age: 1000');
			  header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
			  break;
			}
		  }
		}

	}
	

	set_cors_headers();
	
	print(get_url_content($_GET['url']) ?: 'no content' );
	
	