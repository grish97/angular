Hi {{ $user->name }} please verify you account
<a href="{{ url('verify') . '/' .$user->verification_token }}}">here</a>
Or just copy to link <a href="{{ url('verify/') . '/'. $user->verification_token }}">{{ url('verify/') . '/'. $user->verification_token }}</a>