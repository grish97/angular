Hi {{ $user->name }} please reset your password
<a href="{{ url('set-password') . '/'. $token }}" >here</a>

Or just copy the link <a href="{{ url('set-password') . '/'. $token }}">{{ url('set-password/') . '/'. $token }}</a>